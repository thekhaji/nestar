import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { MemberAuthType, MemberStatus, MemberType } from "../../enums/member.enum";
import { MeLiked } from "../like/like";
import { MeFollowed } from "../follow/follow";


@ObjectType()
export class Member{
    @Field(()=> String)
    _id: ObjectId;

    @Field(()=> MemberType)
    memberType: MemberType;

    @Field(()=> MemberStatus)
    memberStatus: MemberStatus;

    @Field(()=> MemberAuthType)
    memberAuthType: MemberAuthType;

    @Field(()=> String)
    memberPhone: string;

    @Field(()=> String)
    memberNick: string;

    memberPassword?: string;

    @Field(()=>String, {nullable: true})
    memberFullName?: string;

    @Field(()=>String)
    memberImage?: string;

    @Field(()=>String, {nullable: true})
    memberAddress?: string;

    @Field(()=>String, {nullable: true})
    memberDesc?: string;

    @Field(()=> Int)
    memberProperties?: string;

    @Field(()=> Int)
    memberArticle?: string;

    @Field(()=> Int)
    memberFollowers?: string;

    @Field(()=> Int)
    memberFollowings?: string;

    @Field(()=> Int)
    memberPoints?: string;

    @Field(()=> Int)
    memberLikes?: string;

    @Field(()=> Int)
    memberViews?: string;

    @Field(()=> Int)
    memberComments?: string;

    @Field(()=> Int)
    memberRank?: string;

    @Field(()=> Int)
    memberWarnings?: string;

    @Field(()=> Int)
    memberBlocks?: string;

    @Field(()=>Date, {nullable: true})
    deletedAt: Date;

    @Field(()=>Date)
    createdAt: Date;

    @Field(()=>Date)
    updatedAt: Date;

    @Field(()=>String, {nullable: true})
    accessToken?: string;

    //** from aggregation **/
    @Field(()=> [MeLiked], {nullable:true})
    meLiked?:MeLiked[];

    @Field(()=>[MeFollowed], {nullable: true})
    meFollowed: MeFollowed[];
}

@ObjectType()
export class TotalCounter{
    @Field(()=> Int, {nullable: true})
    total: number;
}

@ObjectType()
export class Members{
    @Field(()=>[Member])
    list: Member[];

    @Field(()=> [TotalCounter], {nullable: true})
    metaCounter: TotalCounter[];
}

