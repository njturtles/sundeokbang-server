import {
    CreateDateColumn,
    DeleteDateColumn,
    Generated,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseTimeEntity {
    @Generated('increment')
    @PrimaryColumn()
    _id: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;
}
