import ContatoMod from "../models/ContatoModel.js";

export const index = async (req, res) => {
    const contatos = await ContatoMod.prototype.buscarContato();
    res.render('index',{ contatos });
}