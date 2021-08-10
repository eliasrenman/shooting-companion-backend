import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDocument, User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async findOne(value: any, key: string = '_id') {
    return await this.userModel.findOne({ [key]: value });
  }

  public async create(data: UserCreateDto): Promise<UserDocument> {
    return await this.userModel.create(data);
  }

  public async update(data: UserUpdateDto) {
    
    await this.userModel.updateOne({ _id: data._id }, {
      imageUrl: data.imageUrl
    });

    return await this.findOne(data._id);
  }
}
