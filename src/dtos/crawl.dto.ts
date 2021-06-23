import { IsOptional, IsArray, IsString } from 'class-validator';

export class CreateCrawlDto {
  @IsString()
  public url: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsOptional()
  @IsArray()
  public headings: Array<String>;

}
