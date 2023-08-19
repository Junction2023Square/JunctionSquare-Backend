import { ObjectLiteral, Repository } from 'typeorm';

export abstract class AbstractEntityRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
    constructor(repository: Repository<Entity>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
