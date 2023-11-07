import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1699326469616 implements MigrationInterface {
    name = 'InitialMigration1699326469616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "preco" character varying NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item do pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL DEFAULT '1', "pizzaId" uuid, "pedidoId" uuid, CONSTRAINT "REL_530df9a84defa9217a91e72753" UNIQUE ("pizzaId"), CONSTRAINT "PK_1aeb0bbb503ddb502a5c507d53a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item do pedido" ADD CONSTRAINT "FK_530df9a84defa9217a91e727536" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item do pedido" ADD CONSTRAINT "FK_b12a79eab1fa348dea31cfea324" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item do pedido" DROP CONSTRAINT "FK_b12a79eab1fa348dea31cfea324"`);
        await queryRunner.query(`ALTER TABLE "item do pedido" DROP CONSTRAINT "FK_530df9a84defa9217a91e727536"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "item do pedido"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
    }

}
