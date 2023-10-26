import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1698357193046 implements MigrationInterface {
    name = 'CreateTables1698357193046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "preco" integer NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item do pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_1aeb0bbb503ddb502a5c507d53a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido_items_item do pedido" ("pedidoId" uuid NOT NULL, "itemDoPedidoId" uuid NOT NULL, CONSTRAINT "PK_47c3c8d9f7d233d0fcd23650dd2" PRIMARY KEY ("pedidoId", "itemDoPedidoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5eac74b675aade85e23ad40539" ON "pedido_items_item do pedido" ("pedidoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce04486f6701d4fbc564c52f55" ON "pedido_items_item do pedido" ("itemDoPedidoId") `);
        await queryRunner.query(`ALTER TABLE "pedido_items_item do pedido" ADD CONSTRAINT "FK_5eac74b675aade85e23ad405393" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pedido_items_item do pedido" ADD CONSTRAINT "FK_ce04486f6701d4fbc564c52f550" FOREIGN KEY ("itemDoPedidoId") REFERENCES "item do pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido_items_item do pedido" DROP CONSTRAINT "FK_ce04486f6701d4fbc564c52f550"`);
        await queryRunner.query(`ALTER TABLE "pedido_items_item do pedido" DROP CONSTRAINT "FK_5eac74b675aade85e23ad405393"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce04486f6701d4fbc564c52f55"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5eac74b675aade85e23ad40539"`);
        await queryRunner.query(`DROP TABLE "pedido_items_item do pedido"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "item do pedido"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
    }

}
