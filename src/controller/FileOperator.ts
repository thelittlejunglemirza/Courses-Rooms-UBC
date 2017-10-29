export default class FileOperator{
    private fs = require('fs');

    // create the directory if it doesnt already exist
    makeDirectory(str: string){
        if (!this.fs.existsSync(str)) {                                          // Create directory if not found.
            this.fs.mkdirSync(str)
        }
    }

    // read and write the dataset
    readAndWrite(txtArr: Array<string>, id:string){    ///!!!!!
        if(id === "courses"){
            this.readAndWriteCourses(txtArr, id);
        }else if(id === "rooms"){

        }
        else{
            this.readAndWriteCourses(txtArr, id);
        }
    }

    // read the files from courses and write to JSON file
    readAndWriteCourses(txtArr: Array<string>, id: string){
        let flagFoundCourse = false;
        this.fs.writeFileSync("Data_Set/MyDatasetInsight"+id+".json", '[' + '\n');
        let sep = "";
        for (let i of txtArr) {
            if (this.isJsonString(i)) {
                let obj = JSON.parse(i);
                obj = obj['result'];
                if(flagFoundCourse == false && obj.length > 0){
                    flagFoundCourse = true;
                }
                for (let j of obj) {
                    let dict = {
                        "courses_dept": j['Subject'],
                        "courses_id": j['Course'],
                        "courses_avg": j['Avg'],
                        "courses_instructor": j['Professor'],
                        "courses_title": j['Title'],
                        "courses_pass": j['Pass'],
                        "courses_fail": j['Fail'],
                        "courses_audit": j['Audit'],
                        "courses_uuid": j['id'].toString()
                    };
                    let dictstring = JSON.stringify(dict);

                    this.fs.appendFileSync("Data_Set/MyDatasetInsight"+id+".json", sep + dictstring);
                    if (!sep){
                        sep = ',\n'
                    }
                }
            }
        }
        this.fs.appendFileSync("Data_Set/MyDatasetInsight"+id+".json", '\n]');
        if(flagFoundCourse == false){
            this.fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");
            throw "the dataset is not valid";
        }
    }

    // check if string is JSON
    isJsonString(str: string): boolean{
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // check if dataset exists return 201 if true 204 otherwise
    checkDatasetExists(id: string): number{
        if (this.fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")) {
            this.fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");
            return 201;
        }else{
            return 204;
        }
    }

    // return the string associated with dataset if exists
    getDataset(): string{
        try{
            return this.fs.readFileSync("./Data_Set/MyDatasetInsightcourses.json");
        }catch(err) {
            throw "No Dataset"
        }
    }

    // write the result on a file called Query.json
    writeResultToFile(obj: { [key:string] : any}){
        const content = JSON.stringify(obj);
        this.fs.writeFile("test/Query.json", content, 'utf8', function (err: string) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

    }

}