import { Schema } from "mongoose";

export const ArticleSchema = new Schema({

    created_at: Date,
    title: String,
    url: String,
    author: String,
    points: Number,
    story_text: String,
    comment_text: String,
    num_comments: Number,
    story_id: Number,
    story_title: String,
    story_url: String,
    parent_id: Number,
    created_at_i: Number,
    _tags: Array,
    _highlightResult: Object,
    name: String,
    description: String,
    imageURL: String,
    price: Number,
    objectID: { type: String, unique: true },
    status: { type: Boolean, default: true },
}, {
    timestamps: {
      createdAt: 'created_date',
      updatedAt: 'updated_date'
    }
  });