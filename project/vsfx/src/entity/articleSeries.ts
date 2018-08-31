import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Article } from './article';
@Entity('article_series')
export class ArticleSeries {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { default: 1, comment: '1可用，0禁用' })
    disabled: number;

    @Column('varchar', { length: 225, comment: '系列名称' })
    name: string;

    @OneToMany(type => Article, article => article.articleSeries)
    article: Article;
}