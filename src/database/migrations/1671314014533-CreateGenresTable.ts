import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGenresTable1671314014533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'genres',
          columns: [
            {
              name: "id",
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: "name",
              type: 'varchar',
            },
            {
              name: "description",
              type: 'varchar',
            },
            {
              name: "created_at",
              type: 'timestamp',
              default: 'now()',
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("genres")
    }

}
