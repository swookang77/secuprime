import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import axios from 'axios';

@Injectable()
export class DataService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>
  ) { }
  async resetData() {
    try {
      const response = await axios.get('http://secuprime.com/recruit/202308_testdata.php');
      const data = response.data.data[0];
      const cust = data.cust;
      const cust_detail = data.cust_detail;
      const combinedArray = cust.map(item1 => {
        const matchingItem = cust_detail.find(item2 => item2.guest_code === item1.guest_code);
        return { ...item1, ...matchingItem };
      });
      try {
        await this.customerModel.deleteMany({});
      } catch (err) {
        throw new HttpException('Failed to delete resources of mongodb', 500);
      }
      try {
        await this.customerModel.insertMany(combinedArray);
      } catch (err) {
        throw new HttpException('Failed to insert resources to mongodb',500)
      }
    } catch (err) {
      throw new HttpException('http://secuprime.com/recruit/202308_testdata.php API 오류', 500);
    }
  }
  async getData(){
    try{
      const data = await this.customerModel.find({});
      return data;
    }catch{
      throw new HttpException('Failed to get resources of mongodb',500)
    }
  }
  async patchData(body:any){
    const _id=body._id;
    const data=body.data;
    try{
      await this.customerModel.findByIdAndUpdate(_id,{$set:data})
    }catch(err){
      throw new HttpException('Failed to patch data to mongodb', 500)
    }
  }
  async deleteData(_id:string){
    try{
      await this.customerModel.findByIdAndDelete(_id);
    }catch(err){
      throw new HttpException('Failed to delete mongodb data',500);
    }
  }
}
