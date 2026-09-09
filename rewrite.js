const fs = require('fs');

let content = fs.readFileSync('src/app/[lang]/tienda/page.tsx', 'utf8');

content = content.replace(/const \[quantity, setCantidad\] = useState<number>\(1\);/g, "const [cantidad, setCantidad] = useState<number>(1);");
content = content.replace(/quantity - 1/g, "cantidad - 1");
content = content.replace(/quantity \+ 1/g, "cantidad + 1");
content = content.replace(/{quantity}/g, "{cantidad}");

content = content.replace(/const \[shippingDetails, setShippingDetails\] = useState\(\{[\s\S]*?country: 'España'\n    \}\);/, `const [shippingDetails, setShippingDetails] = useState({
        firstName: '', lastName: '', email: '',
        address: '', city: '', zip: '', province: '', country: 'España'
    });`);

content = content.replace(/const \[isLoading, setIsLoading\] = useState\(false\);/, `const [isLoading, setIsLoading] = useState(false);
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');`);

content = content.replace(/const required = \['firstName', 'lastName', 'email', 'phone', 'dni', 'address', 'city', 'zip', 'province', 'country'\];[\s\S]*?(?=if \(shippingDetails\.email &&)/, `const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'province', 'country'];
        
        required.forEach(field => {
            if (!shippingDetails[field as keyof typeof shippingDetails].trim()) {
                errors[field] = (t.store as any).shippingForm.required;
            }
        });

        if (!dni.trim()) {
            errors.dni = 'El D.N.I es obligatorio';
        }

        if (!telefono.trim()) {
            errors.telefono = (t.store as any).shippingForm.required;
        } else if (telefono.trim().length < 6) {
            errors.telefono = 'el teléfono no parece válido';
        }

        `);

content = content.replace(/body: JSON\.stringify\(\{[\s\S]*?telefono: shippingDetails\.phone\n                \}\),/, `body: JSON.stringify({
                    genero,
                    talla,
                    cantidad,
                    dni,
                    telefono,
                    lang: lang || 'es',
                    shippingDetails
                }),`);

content = content.replace(/\{renderInput\('phone', \(t\.store as any\)\.shippingForm\.phone, 'tel'\)\}/, `<div className="flex flex-col gap-1 w-full relative group">
                                                            <label className="text-[10px] uppercase font-bold text-zinc-400 pl-1 tracking-wider">{(t.store as any).shippingForm.phone}</label>
                                                            <input
                                                                type="tel"
                                                                value={telefono}
                                                                onChange={(e) => {
                                                                    setTelefono(e.target.value);
                                                                    if(formErrors.telefono) setFormErrors(prev => ({...prev, telefono: ''}));
                                                                }}
                                                                className={\`w-full bg-white/5 border \${formErrors.telefono ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]'} rounded-lg px-4 py-3 text-white text-sm transition-all focus:outline-none focus:ring-1 \${formErrors.telefono ? 'focus:ring-red-500/50' : 'focus:ring-gold/50'} placeholder:text-zinc-600 backdrop-blur-sm group-hover:bg-white/10\`}
                                                            />
                                                            <AnimatePresence>
                                                                {formErrors.telefono && (
                                                                    <motion.span 
                                                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                                        className="text-red-400 text-[10px] pl-1 absolute -bottom-4"
                                                                    >
                                                                        {formErrors.telefono}
                                                                    </motion.span>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>`);
                                                        
content = content.replace(/\{renderInput\('dni', 'D\.N\.I \(Obligatorio\)', 'text', 'Ej: 12345678X'\)\}/, `<div className="flex flex-col gap-1 w-full relative group">
                                                            <label className="text-[10px] uppercase font-bold text-zinc-400 pl-1 tracking-wider">D.N.I (Obligatorio)</label>
                                                            <input
                                                                type="text"
                                                                value={dni}
                                                                placeholder="Ej: 12345678X"
                                                                onChange={(e) => {
                                                                    setDni(e.target.value);
                                                                    if(formErrors.dni) setFormErrors(prev => ({...prev, dni: ''}));
                                                                }}
                                                                className={\`w-full bg-white/5 border \${formErrors.dni ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]'} rounded-lg px-4 py-3 text-white text-sm transition-all focus:outline-none focus:ring-1 \${formErrors.dni ? 'focus:ring-red-500/50' : 'focus:ring-gold/50'} placeholder:text-zinc-600 backdrop-blur-sm group-hover:bg-white/10\`}
                                                            />
                                                            <AnimatePresence>
                                                                {formErrors.dni && (
                                                                    <motion.span 
                                                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                                        className="text-red-400 text-[10px] pl-1 absolute -bottom-4"
                                                                    >
                                                                        {formErrors.dni}
                                                                    </motion.span>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>`);                                                        

fs.writeFileSync('src/app/[lang]/tienda/page.tsx', content);

let apiContent = fs.readFileSync('src/app/api/checkout/route.ts', 'utf8');

apiContent = apiContent.replace(/const \{ quantity, size, gender, lang, shippingDetails, dni, telefono \} = await req\.json\(\);[\s\S]*?const cantidad = quantity;/g, `const { genero, talla, cantidad, dni, telefono, lang, shippingDetails } = await req.json();
    
    // 4.1 Validación básica en el servidor
    const tallasValidas = ['S','M','L','XL','2XL','3XL','4XL','5XL', 'XS', 'XXL']; // Incluyendo tallas de mujer vistas en el frontend
    const generosValidos = ['Hombre','Mujer', 'male', 'female'];`);

fs.writeFileSync('src/app/api/checkout/route.ts', apiContent);
