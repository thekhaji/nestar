import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BoardArticleService } from './board-article.service';
import {  UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AllBoardArticlesInquiry, BoardArticleInput, BoardArticlesInquiry } from '../../libs/dto/board-article/board-article.input';
import { BoardArticle, BoardArticles } from '../../libs/dto/board-article/board-article';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { BoardArticleUpdate } from '../../libs/dto/board-article/board-article.update';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Member } from '../../libs/dto/member/member';

@Resolver()
export class BoardArticleResolver {
    constructor(private readonly boardArticleService: BoardArticleService){}

    @UseGuards(AuthGuard)
    @Mutation((returns)=> BoardArticle)
    public async createBoardArticle(
        @Args('input') input: BoardArticleInput,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle>{
        console.log('Mutation: createBoardArticle');
        return await this.boardArticleService.createBoardArticle(memberId, input);
        
    }

    @UseGuards(WithoutGuard)
    @Query((returns)=> BoardArticle)
    public async getBoardArticle(
        @Args('articleId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle>{
        console.log('Query: getBoardArticle');
        const articleId = shapeIntoMongoObjectId(input);
        return await this.boardArticleService.getBoardArticle(memberId, articleId);
    }

    @UseGuards(AuthGuard)
    @Mutation(()=>BoardArticle)
    public async updateBoardArticle(
        @Args('input') input: BoardArticleUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle>{
        console.log('Mutation: updateBoardArticle');
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.boardArticleService.updateBoardArticle(memberId, input);
    }

    @UseGuards(WithoutGuard)
    @Query((returns)=> BoardArticles)
    public async getBoardArticles(
        @Args('input') input: BoardArticlesInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticles>{
        console.log('Query: getBoardArticles');
        return await this.boardArticleService.getBoardArticles(memberId, input);
        
    }

    @UseGuards(AuthGuard)
    @Mutation(()=>BoardArticle)
    public async likeTargetBoardArticle(
        @Args('articleId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Member>{
        console.log("Mutation: likeTargetBoardArticle");
        const likeRefId = shapeIntoMongoObjectId(input);
        return await this.boardArticleService.likeTargetBoardArticle(memberId, likeRefId);
    }

    /** ADMIN **/

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Query((returns)=> BoardArticles)
    public async getAllBoardAticlesByAdmin(
        @Args('input') input: AllBoardArticlesInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticles>{
        console.log('Query: getAllBoardAticlesByAdmin');
        return await this.boardArticleService.getAllBoardAticlesByAdmin(input);
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(()=> BoardArticle)
    public async updateBoardArticleByAdmin(
        @Args('input') input: BoardArticleUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle>{
        console.log('Mutation: updateBoardArticleByAdmin');
        return await this.boardArticleService.updateBoardArticleByAdmin(input);
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation((returns)=> BoardArticle)
    public async removeBoardArticleByAdmin(
        @Args('articleId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<BoardArticle>{
        console.log('Mutation: removeBoardArticleByAdmin');
        const articleId = shapeIntoMongoObjectId(input);
        return await this.boardArticleService.removeBoardArticleByAdmin(articleId);
        
    }
}
