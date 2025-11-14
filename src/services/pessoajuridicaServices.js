const { conectar, desconectar } = require('../database/config');

const tableName = "pessoa_juridica";

// 1. Get - Listar Todos
const get = async (req, res) => {
    const connection = await conectar();
    try {
        const [rows] = await connection.execute(`SELECT * FROM ${tableName} ORDER BY id DESC`);
        res.status(200).send(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send({ message: 'Erro ao buscar registros', success: false });
    } finally {
        desconectar(connection);
    }
}

// 2. GET by ID
const getByid = async (req, res) => {
    const id = req.params.id;
    const connection = await conectar();
    try {
        const [rows] = await connection.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
        if (rows.length > 0) {
            res.status(200).send(rows[0]);
        } else {
            res.status(404).send({ message: 'Registro não encontrado', success: false});
        }
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send({ message: 'Erro ao buscar o registro', success: false});
    } finally {
        desconectar(connection);
    }
};

// 3. POST - Inserir Novo
const post = async (req, res) => {
    const dataPayload = req.body;
    const campo = Object.keys(dataPayload);
    const valores = Object.values(dataPayload);
    const connection = await conectar();

    try {
        const placeholders = campo.map(() => '?').join(', ');
        const sql = `INSERT INTO ${tableName} (${campos.join(', ')}) VALUES (${placeholders})`;
        const [result] = await connection.execute(sql, valores);

        res.status(201).send({
            message: 'Registro inserido com sucesso',
            id: result.insertId,
            success: true
        });
    } catch (error) {
        console.error('Erro ao inserir registro:', error);
        res.status(400).send({ message: error.message, success: false});
    } finally {
        desconectar(connection);
    }
};

// 4. PUT - atualizar
const put = async (req, res) => {
    const id = req.params.id;
    const dataPayload = req.body;
    const campos = Object.keys(dataPayload);
    const valores = Object.values(dataPayload);
    const connection = await conectar();

    try {
        const setClause = campos.map((campo) => `${campo} = ?`).join(', ');
        const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
        const [result] = await connection.execute(sql, [...valores, id]);

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Registro atualizado com sucesso', success: true});
        } else {
            res.status(404).send({ message: 'Registro não encontrado', success: false});
        }
    } catch (error) {
        console.error('Erro ao atualizar registro:', error);
        res.status(400).send({ message: error.message, success: false});
    } finally {
        desconectar(connection);
    }
};

// 5. DELETE
const erase = async (req, res) => {
    const id = req.params.id;
    const connection = await conectar();

    try {
        const [result] = await connection.execute(`DELETE FROM ${tableName} WHERE id = ?`, [id]);

        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Registro excluído com sucesso', success: true});
        } else {
            res.status(404).send({ message: 'Registro não encontrado', success: false});
        }
    } catch (error) {
        console.error('Erro ao excluir registro:', error);
        res.status(500).send({ message: 'Erro ao executar a solicitação', success: false});
    } finally {
        desconectar(connection);
    }
};

module.exports = {
    get,
    getByid,
    post,
    put,
    erase
};