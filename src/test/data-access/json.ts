import {expect} from 'chai';
import {JsonDataAccess} from "../../data-access";

const testJson = './src/test/test.json',
    objectJson = {
        title: 'title',
        description: 'description',
        subTitles: ['title 1', 'title 2', 'title 3'],
        contents: ['hello 1', 'hello 2', 'hello 3']
    },
    stringifiedObject = JSON.stringify(objectJson, null, 2);

describe('JsonDataAccess', () => {

    describe('write and read file', () => {
        it('should return an stringified json', () => {
            JsonDataAccess.writeJsonFile(testJson, objectJson)
                .then((result: object) => {
                    expect(result)
                        .to.equal(stringifiedObject)

                    JsonDataAccess.readFile(testJson)
                        .then((result: object) => {
                            expect(result)
                                .to.equal(stringifiedObject)
                        })
                        .catch((result) => {
                            console.log(result);
                        });
                })
                .catch((result) => {
                    console.log(result);
                });
        });
    });
});

