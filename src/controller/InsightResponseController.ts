import {InsightResponse} from "./IInsightFacade";

export class InsightResponseController{
    private response: InsightResponse = {
        code: 0,
        body: {}
    };


    setCode(code: number){
        this.response.code = code;
    }
    setError(code: number, err: string){
        if(err === "No Dataset"){
            this.response.code = 424;
            this.response.body = {error: err};
        }else {
            this.response.code = code;
            this.response.body = {error: err};
        }
    }
    setFulfill(code: number,body: {}){
        this.response.code = code;
        this.response.body = body;
    }

    getResponse(): InsightResponse{
        return this.response;
    }


}