import mongoose from 'mongoose';

import Model from '../model';

const ObjectIdSchema = mongoose.Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

export const AnswerSchema = new mongoose.Schema({
    id: { type: String, default: '' },
    question: { type : String },
    text: { type: String, default: '' },
	  isDeleted: { type : Boolean, default : false }
});

AnswerSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

const Answer = mongoose.model('Answer', AnswerSchema);

/**
 * Service level class with methods for answers.
 */
export default class AnswerModel {
    constructor() {
        this.model = new Model(Answer);
    }

    getAll(survey) {
        const criteria = {
          ...survey,
          isDeleted: false
        };
        return this.model.select(criteria, {sortKey: 'index', sort: 1});
    }

	getAllIncludeDeleted(survey) {
		const criteria = {
			...survey
		};
		return this.model.select(criteria, {sortKey: 'index', sort: 1});
	}
    
    getById(questionId) {
        const criteria = {
            id: questionId
        };
        return this.model.select(criteria);
    }
    
    create(question) {
        return this.model.create(question);
    }

    update(question) {
        const criteria = {id: question.id};
        delete question.id;
        
        const update = question;
        return this.model.update(criteria, update);
    }

    remove(id) {
        const criteria = {id};
        return this.model.update(criteria, {isDeleted: true});
    }

    getOrder(surveyId) {
        return this.model.select({survey: surveyId}, {sortKey: 'index', sort: 1}, {index: 1, id: 1});
    }

    updateOrder(order) {
        const request = order.map(o => this.model.update({id: o.id}, {index: o.index}));
        return Promise.all(request);
    }
}
