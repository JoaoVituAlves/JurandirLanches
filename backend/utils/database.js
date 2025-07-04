import mysql from 'mysql2';

export default class Database {

    #conexao;

    get conexao() { return this.#conexao;} set conexao(conexao) { this.#conexao = conexao; }

    constructor() {

        this.#conexao = mysql.createPool({
            host: '132.226.245.178', //endereço do nosso banco de dados na nuvem
            database: 'ATIVIDADE_10442210890', //a database de cada um de vocês possui a nomenclatura DB_(RA)
            user: '10442210890', // usuario e senha de cada um de vocês é o RA
            password: '10442210890',
        });
    }

    ExecutaComando(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results);
            });
        })
    }
    
    ExecutaComandoNonQuery(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results);

            });
        })
    }

    ExecutaComandoLastInserted(sql, valores) {
        var cnn = this.#conexao;
        return new Promise(function(res, rej) {
            cnn.query(sql, valores, function (error, results, fields) {
                if (error) 
                    rej(error);
                else 
                    res(results.insertId);
            });
        })
    }

}



