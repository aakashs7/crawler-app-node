import { model, Schema, Document } from 'mongoose';
import { Crawl } from '../interfaces/crawl.interface';

const crawlSchema: Schema = new Schema({
    url: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    headings: [{ type: String }]
}, { timestamps: true });

const crawlModel = model<Crawl & Document>('Crawl', crawlSchema);

export default crawlModel;
