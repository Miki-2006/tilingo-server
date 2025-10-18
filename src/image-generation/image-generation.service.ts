import { Injectable } from '@nestjs/common';
import { CreateImageGenerationDto } from './dto/create-image-generation.dto';
import { UpdateImageGenerationDto } from './dto/update-image-generation.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timestamp } from 'rxjs';
import { CreateVideoGenerationDto } from './dto/create-video-generation.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ImageGenerationService {
  constructor(
    private readonly httpService: HttpService  ) { }
  async create(createImageGenerationDto: CreateImageGenerationDto): Promise<any> {
    const url = 'https://api.kie.ai/api/v1/mj/generate';

    const headers = { Authorization: `Bearer ${process.env.KIE_AI_MJ_API_KEY}`, 'Content-Type': 'application/json' }

    const body = `{"taskType":"mj_txt2img","speed":"relaxed","prompt":"Help me generate a ${createImageGenerationDto.text}","fileUrls":["https://example.com/image.jpg"],"aspectRatio":"16:9","version":"7","variety":10,"stylization":1,"weirdness":1,"waterMark":"","enableTranslation":false,"callBackUrl":"https://api.example.com/callback","ow":500,"videoBatchSize":1,"motion":"high"}`;

    try {
      const response = await firstValueFrom(this.httpService.post(url, body, { headers }));

      return response.data
    } catch (error) {
      console.log(`Image generating error: ${error}`);
    }
  }

  // async createVideo(createVideoGenerationDto: CreateVideoGenerationDto): Promise<any> {
  //   const urlOfKlingAI = 'https://api-singapore.klingai.com/v1/videos/text2video';

  //   const accessKey = process.env.KLING_AI_ACCESS_KEY;
  //   const secretKey = process.env.KLING_AI_SECRET_KEY;
  //   if (!accessKey || !secretKey) {
  //     throw new Error('AccessKey or SecretKey is missing');
  //   }

  //   const now = Math.floor(Date.now() / 1000); // в секундах

  //   const payload = {
  //     accessKey: accessKey,
  //     iat: now,
  //     nbf: now + 1,
  //     exp: now + 1800
  //   }

  //   const token = jwt.sign(payload, secretKey as string, { algorithm: 'HS256', header: {alg: 'HS256', typ: 'JWT'} });
  //   console.log(token);
  //   console.log(createVideoGenerationDto.text);
    
  //   const data = {
  //     prompt: `${createVideoGenerationDto.text}`,
  //     duration: 5
  //   };

  //   const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  //   try {
  //     const response = await firstValueFrom(this.httpService.post(urlOfKlingAI, data, { headers }));

  //     return response.data;
  //   } catch (error) {
  //     console.log(`Video generating error: ${error}`);
  //   }
  // }

  // findAll() {
  //   return `This action returns all imageGeneration`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} imageGeneration`;
  // }

  // update(id: number, updateImageGenerationDto: UpdateImageGenerationDto) {
  //   return `This action updates a #${id} imageGeneration`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} imageGeneration`;
  // }
}
