import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../../libs/entity/favorite/favorite.entity';

@Injectable()
export class FavoriteRepository extends Repository<Favorite> {
    constructor(
        @InjectRepository(Favorite)
        private readonly repository: Repository<Favorite>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findByUserProviderId(providerId: string): Promise<Favorite[]> {
        return this.repository.find({
            where: { user: { providerId } },
            relations: ['room'],
        });
    }
}
