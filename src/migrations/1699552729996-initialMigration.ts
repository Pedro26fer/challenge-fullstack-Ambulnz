import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1699552729996 implements MigrationInterface {
    name = 'InitialMigration1699552729996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pizzas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" character varying NOT NULL, CONSTRAINT "PK_27f7ede7b9304d8372a336d1e5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL DEFAULT '1', "pizzaId" uuid, "orderId" uuid, CONSTRAINT "REL_85d2b7a53b9b3e4d699f439d3e" UNIQUE ("pizzaId"), CONSTRAINT "PK_634c4687b54f6a44ac0c142adf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_85d2b7a53b9b3e4d699f439d3e7" FOREIGN KEY ("pizzaId") REFERENCES "pizzas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_6e9482ce6526e04d3b15fd9ea56" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_6e9482ce6526e04d3b15fd9ea56"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_85d2b7a53b9b3e4d699f439d3e7"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "buy"`);
        await queryRunner.query(`DROP TABLE "pizzas"`);
    }

}
