import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1699468451183 implements MigrationInterface {
    name = 'InitialMigration1699468451183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "preco" character varying NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_do_pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL DEFAULT '1', "pizzaId" uuid, "pedidoId" uuid, CONSTRAINT "REL_0603b7218488ac18c0bdf648d6" UNIQUE ("pizzaId"), CONSTRAINT "PK_362153b7d00a8aa351f5ae6f396" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item_do_pedido" ADD CONSTRAINT "FK_0603b7218488ac18c0bdf648d67" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_do_pedido" ADD CONSTRAINT "FK_410413213635efcf1cd53c46372" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_do_pedido" DROP CONSTRAINT "FK_410413213635efcf1cd53c46372"`);
        await queryRunner.query(`ALTER TABLE "item_do_pedido" DROP CONSTRAINT "FK_0603b7218488ac18c0bdf648d67"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "item_do_pedido"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
    }

}
