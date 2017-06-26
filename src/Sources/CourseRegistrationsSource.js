import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var gatewayConfig = Config.apiUrl.gateway;

var CourseRegistrationsSource = {
    fetch: function (model) {
        return axios.get(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.courseRegistration.fetch}?${ObjectToQuery.asQuery(model)}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return {
                    totalPage: 1,
                    totalResults: 2,
                    data: [
                        {
                            attributes: {
                                courseId: "234234454545243234234234234234234",
                                courseTitle: "How it's work?",
                                numberOfRegistrations: 3
                            }
                        },
                        {
                            attributes: {
                                courseId: "889999999789789789789789789789",
                                courseTitle: "How?",
                                numberOfRegistrations: 4
                            }
                        }
                    ]
                }
            });
    },

    getCourseRegistrationDetails: function (courseId) {
        return axios.get(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.courseRegistration.courseDetail}?filter[reference_id]=${courseId}&page[size]=1000&page[number]=1`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return {
                    courseName: "How it's work?",
                    totalResults: 3,
                    data: [
                        {
                            attributes: {
                                id: "2",
                                firstName: "Andy",
                                lastName: "Warhole",
                                userId: 234,
                                registrationDate : "01/01/2017",
                                lastActivityDate : "01/05/2017",
                            }
                        },
                        {
                            attributes: {
                                id: "4",
                                firstName: "Jo",
                                lastName: "Smith",
                                userId:235,
                                registrationDate : "01/02/2017",
                                lastActivityDate : "02/03/2017",
                            }
                        },
                        {
                            attributes: {
                                id: "5",
                                firstName: "Jimmy",
                                lastName: "Colt",
                                userId:236,
                                registrationDate : "03/05/2017",
                                lastActivityDate : "02/07/2016",
                            }
                        }
                    ]
                }
            });
    }
};

export default CourseRegistrationsSource;