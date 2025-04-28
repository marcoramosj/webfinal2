import type { NextApiRequest, NextApiResponse } from 'next';

const visitantes = [
  { usuario: 'alejandra.m', contraseña: 'verde123', nombreCompleto: 'Alejandra Morales', boleto: '00123' },
  { usuario: 'david.p', contraseña: 'bosque456', nombreCompleto: 'David Pérez', boleto: '00124' },
  { usuario: 'lucia.r', contraseña: 'eco789', nombreCompleto: 'Lucía Ramírez', boleto: '00125' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, mensaje: 'Método no permitido' });
  }

  const { usuario, contraseña } = req.body;

  const visitante = visitantes.find(v => v.usuario === usuario && v.contraseña === contraseña);

  if (visitante) {
    res.status(200).json({
      success: true,
      nombreCompleto: visitante.nombreCompleto,
      boleto: visitante.boleto
    });
  } else {
    res.status(401).json({
      success: false,
      mensaje: 'Datos incorrectos, intenta de nuevo.'
    });
  }
}
