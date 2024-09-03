import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from '../../libs/dto/property/property';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';
import { ViewService } from '../view/view.service';
import { MemberService } from '../member/member.service';

@Injectable()
export class PropertyService {
    constructor( 
        @InjectModel("Property") private readonly propertyModel: Model<null>,
        private authService: AuthService,
        private viewService: ViewService,
        private memberService: MemberService,
    ){}
    
    public async createProperty(input: PropertyInput): Promise<Property> {
        try {
            const result = await this.propertyModel.create(input);
            await this.memberService.memberStatsEditor({
                _id: result.memberId,
                targetKey: 'memberProperties',
                modifier: 1,
            });
            return result;
        } catch (err) {
            console.log("Error Property.Model createProperty:", err.message);
            throw new BadRequestException(Message.CREATE_FAILED);
        }
    }
}
