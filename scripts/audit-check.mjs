import { getAuditData } from '../src/lib/audit-service.ts';

async function checkAudit() {
    console.log('🔍 Iniciando verificación de seguridad de Antigravity...');

    try {
        const data = await getAuditData();
        const securityCategory = data.categories.find(c => c.name === 'Seguridad y Privacidad');

        console.log(`📊 Score de Seguridad: ${securityCategory?.score}%`);

        if (!securityCategory || securityCategory.score < 100) {
            console.error('❌ ERROR: Cumplimiento de seguridad inferior al 100%.');
            console.error('⚠️ Despliegue bloqueado por política de Antigravity.');
            process.exit(1);
        }

        console.log('✅ Verificación de seguridad superada. Procediendo con el despliegue.');
    } catch (error) {
        console.error('❌ Error durante la auditoría:', error.message);
        process.exit(1);
    }
}

checkAudit();
