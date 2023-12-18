import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1702933673274 implements MigrationInterface {
    name = 'InitialMigration1702933673274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" character varying NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL DEFAULT '1', "pizzaId" uuid, "orderId" uuid, CONSTRAINT "REL_85d2b7a53b9b3e4d699f439d3e" UNIQUE ("pizzaId"), CONSTRAINT "PK_634c4687b54f6a44ac0c142adf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizzas_ingredients_ingredients" ("pizzasId" uuid NOT NULL, "ingredientsId" uuid NOT NULL, CONSTRAINT "PK_34d2dc00e6f6219d5e691e01c5e" PRIMARY KEY ("pizzasId", "ingredientsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_759ab5c1129b880ceb1430ff87" ON "pizzas_ingredients_ingredients" ("pizzasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_accc21afbd8f59e03d21cda511" ON "pizzas_ingredients_ingredients" ("ingredientsId") `);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_85d2b7a53b9b3e4d699f439d3e7" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_6e9482ce6526e04d3b15fd9ea56" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" ADD CONSTRAINT "FK_759ab5c1129b880ceb1430ff87d" FOREIGN KEY ("pizzasId") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" ADD CONSTRAINT "FK_accc21afbd8f59e03d21cda511a" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" DROP CONSTRAINT "FK_accc21afbd8f59e03d21cda511a"`);
        await queryRunner.query(`ALTER TABLE "pizzas_ingredients_ingredients" DROP CONSTRAINT "FK_759ab5c1129b880ceb1430ff87d"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_6e9482ce6526e04d3b15fd9ea56"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_85d2b7a53b9b3e4d699f439d3e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_accc21afbd8f59e03d21cda511"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_759ab5c1129b880ceb1430ff87"`);
        await queryRunner.query(`DROP TABLE "pizzas_ingredients_ingredients"`);
        await queryRunner.query(`DROP TABLE "buy"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
