import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var CoursesPerCategorySource = {
    fetch: function (model) {
        return axios.get(`${Config.endpointUrl.coursePerCategory.apiUrl}${Config.endpointUrl.coursePerCategory.fetch}?${ObjectToQuery.asQuery(model)}`)
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
                                categoryId: "23423445",
                                categoryName: "Fun",
                                subCategories: [{
                                    name:"kitty dfgdfgdf dfg ",
                                    coursesCount: 4,
                                    progress: 30
                                },
                                {
                                    name:"kittyd dfg dfg  2",
                                    coursesCount: 10,
                                    progress: 70
                                },
                                {
                                    name:"kitty dfg dfg  dfgdf dfg3",
                                    coursesCount: 10,
                                    progress: 20
                                },
                                {
                                    name:"kitty dfg dfgd 4",
                                    coursesCount: 10,
                                    progress: 90
                                },
                                {
                                    name:"kitty dfg dfg dfg  5",
                                    coursesCount: 10,
                                    progress: 10
                                }],
                                categorySummary: "25%"
                            }
                        },
                        {
                            attributes: {
                                categoryId: "232323",
                                categoryName: "Art",
                                subCategories: [{
                                    name:"kitty 4",
                                    coursesCount: 10,
                                    progress: 40
                                },
                                {
                                    name:"kitty dffg dfg dfg  4",
                                    coursesCount: 80,
                                    progress: 50
                                },
                                {
                                    name:"kitty dfg dfg 4",
                                    coursesCount: 10,
                                    progress: 50
                                }],
                                categorySummary: "50%"
                            }
                        }
                    ]
                }
            });
    }
};

export default CoursesPerCategorySource;