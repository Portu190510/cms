import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var CoursesOnReviewSource = {
    fetch: function (model) {
        return axios.get(`${Config.apiUrl}${Config.endpointUrl.courseOnReview.fetch}?${ObjectToQuery.asQuery(model)}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return {
                    totalPage:1,
                    totalResults:2,
                    data: [
                        {
                            attributes: {
                                courseId: "234234454545243234234234234234234",
                                title: "How it's work?",
                                dateSubmitted: "2/21/2017",
                                primaryCategoryName: "Academics cat",
                                primarySubCategoryName: "Academics sub",
                                secondarySubCategoryName: "Academics sec. sub.",
                                secondaryCategoryName: "Academics sec. cat",
                                instructorIds: [{
                                    name: "Bart Simpson",
                                    email: "bart@gmail.com"
                                },
                                {
                                    name: "Gomer J. Simpson",
                                    email: "bart@gmail.com"
                                }]
                            }
                        },
                        {
                            attributes: {
                                courseId: "8967897897897897897897897897897678678",
                                title: "Apple",
                                dateSubmitted: "3/22/2017",
                                primaryCategoryName: "Academics cat",
                                primarySubCategoryName: "Academics sub",
                                secondarySubCategoryName: "Academics sec. sub.",
                                secondaryCategoryName: "Academics sec. cat",
                                instructorIds: [{
                                    name: "Marge Simpson",
                                    email: "marge@gmail.com"
                                },
                                {
                                    name: "Lisa Simpson",
                                    email: "lisa@gmail.com"
                                }]
                            }
                        }
                    ]
                }
            });
    },
    changeStatus: function (courseId, status) {
        return axios.post(`${Config.apiUrl}${Config.endpointUrl.courseOnReview.changeStatus}`, { courseId: courseId, status: status }).then(response => {
            return response;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default CoursesOnReviewSource;