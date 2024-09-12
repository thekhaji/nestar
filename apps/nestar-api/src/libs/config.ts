import {ObjectId} from 'bson';
 // IMAGE CONFIGURATION
 import { v4 as uuidv4 } from 'uuid';
 import * as path from 'path';

export const availbleAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availbleMemberSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];
export const availableOptions = ['propertyBarter', 'propertyRent'];
export const availablePropertySorts = [
    'createdAt',
    'updatedAt',
    'propertyLikes',
    'propertyViews',
    'propertyRank',
    'propertyPrice',
];
export const availbleBoardArticleSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];
export const availableCommentSorts = ['createdAt', 'updatedAt'];
 
 export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
 export const getSerialForImage = (filename: string) => {
     const ext = path.parse(filename).ext;
     return uuidv4() + ext;
 };

export const shapeIntoMongoObjectId = (target: any) => {
    return typeof target === "string" ? new ObjectId(target) : target;
}

export const lookupMember = {
    $lookup: {
        from: 'members',
        localField: 'memberId',
        foreignField: '_id',
        as: 'memberData',
    }
}