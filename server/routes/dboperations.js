var config = require('./dbconfig');
const sql = require('mssql');

async function getUsers(){
    try{
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from Users");
        //console.log(users.recordsets[0][0].PersonID);
        return users.recordsets;
    }
    catch (error) {
        console.warn(error);
    }
}

async function insertUser(username, password, fname, lname, email){
    try{
        let pool = await sql.connect(config);
        let addQuery = await pool.request().query(
            `INSERT INTO Users (
                UserName, 
                Password, 
                FirstName, 
                LastName, 
                Email
            ) VALUES (
                '${username}',
                '${password}',
                '${fname}',
                '${lname}',
                '${email}');`
        );
        //let addedUser = await pool.request().query(`SELECT * from Users WHERE UserID = ` + userID + `;`);
        //console.log(users.recordsets[0][0].PersonID);
        //return users.recordsets;
        //console.log("Here's Johnny " + addQuery);
        return addQuery;
    }
    catch (error) {
        //console.warn(error);
        return error;
    }
}

async function getTotal(userID){
    try{
        let pool = await sql.connect(config);
        let total = await pool.request().query(`SELECT * from projects_table WHERE user_id=${userID}`);
        return total.rowsAffected[0];
    }
    catch (error) {
        console.warn(error);
    }
}

async function getProjects(userID){
    try{
        let pool = await sql.connect(config);
        let project = await pool.request().query(`SELECT * from projects_table WHERE user_id=${userID}`);
        return project.recordset;
    }
    catch (error) {
        console.warn(error);
    }
}

async function getComponents(projectID){
    try{
        let pool = await sql.connect(config);
        let components = await pool.request().query(`SELECT * from component_table WHERE tabs_id LIKE '%${projectID}%'`);
        return components.recordsets;
    }
    catch (error) {
        console.warn(error);
    }
}
async function getCanvas(projectID){
    try{
        let pool = await sql.connect(config);
        let project = await pool.request().query(`SELECT * from tab_table WHERE tab_id LIKE '%${projectID}%'`);
        return project.recordset;
    }
    catch (error) {
        console.warn(error);
    }
}
async function getCss(projectID){
    try{
        let pool = await sql.connect(config);
        let project = await pool.request().query(`SELECT * from css_table WHERE project_id='${projectID}'`);
        return project.recordset;
    }
    catch (error) {
        console.warn(error);
    }
}

async function deleteUser(userID){
    try{
        let pool = await sql.connect(config);
        //let tobeDeletedUser = await pool.request().query(`SELECT FROM Users WHERE UserID=${userID};`);
        let deleteUser = await pool.request().query(`DELETE FROM Users WHERE UserID=${userID};`);
        //console.log(tobeDeletedUser);
        return deleteUser;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function deleteProject(projectID){
    try{
        let pool = await sql.connect(config);
        let deleteUser = await pool.request().query(`DELETE FROM projects_table WHERE project_id='${projectID}';`);
        return deleteUser;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function saveProject(userID, projectName, projectID) {
    let query = `INSERT INTO projects_table (user_id, project_id, project_name, date) VALUES ('${userID}', '${projectID}', '${projectName}', CURRENT_TIMESTAMP);`;
    try {
        let pool = await sql.connect(config);
        let total = await pool.request().query(query);
        return total;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function saveTabs(canvasKeys, canvasNames) {
    let query = `INSERT INTO tab_table (tab_id, tab_name) VALUES `;

    for (let i = 0; i < canvasKeys.length; i++) { //query builder for single query insert
        query += `('${canvasKeys[i]}', '${canvasNames[i]}')`;
        if (i < (canvasKeys.length - 1)) {
            query += `, `;
        }
    }
    
    try {
        let pool = await sql.connect(config);
        let results = await pool.request().query(query);
        return results;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function saveComponents(componentList, canvasKeys, canvasNativeKeys) {
    let checkNames = ["id", "value", "class", "style", "typeObj", "type", "draggable", "mouseDragPositionX", "mouseDragPositionY", "linkValue", "href", "name", "checked", "placeholder", "tblCols", "tblRows", 
                        "cols", "rows", "finalStyle", "isIcon", "iconValue", "iconLabel1", "iconLabel2", "target", "redirection"]; //datatypes to be saved
    let skip = ["key", "selected", "hidden", "dummyDate", "tblArrayCol", "tblArrayRow", "url", "tblContent", "linksArray", "isSavedComponent"]; //skip these properties
    let query = `INSERT INTO component_table (tabs_id, 
                                              componentID,
                                              componentValue,
                                              componentClass,
                                              componentStyle,
                                              componentTypeObj,
                                              componentType,
                                              componentDraggable,
                                              componentPositionX,
                                              componentPositionY,
                                              componentOptionValues,
                                              componentHREF,
                                              componentName,
                                              componentChecked,
                                              componentPlaceholder,
                                              componentColumns,
                                              componentRows,
                                              componentTextboxCols,
                                              componentTextboxRows,
                                              componentFinalStyle,
                                              componentIsIcon,
                                              componentIconValue,
                                              componentIconLabel1,
                                              componentIconLabel2,
                                              componentTarget,
                                              componentRedirection) VALUES `;
    
    for (let i = 0; i < canvasNativeKeys.length; i++) {
        for (let j = 0; j < Object.keys(componentList[canvasNativeKeys[i]]).length; j++) {
            let l = 0;
            let propKeys = Object.keys(componentList[canvasNativeKeys[i]][j]);
            query += `('${canvasKeys[i]}', `;
            for (let k = 0; l < checkNames.length; k++) {
                if (skip.includes(propKeys[k]) == false) { //skip some unneeded data
                    if (checkNames[l] == propKeys[k]) {   
                        query += `'${componentList[canvasNativeKeys[i]][j][propKeys[k]]}'`;
                    } else {
                        query += `''`;
                        k--;
                    }  
                    if (l < (checkNames.length - 1)) {
                        query += `, `;
                    }
                    l++;
                }
            }
            query += `)`;
            if (j < (Object.keys(componentList[canvasNativeKeys[i]]).length - 1)) {
                query += `, `;
            }
        }
        if (i < (canvasNativeKeys.length - 1)) {
            query += `, `;
        }
    }
    // console.log(query);
    try {
        let pool = await sql.connect(config);
        let results = await pool.request().query(query);
        return results;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
    //console.log(componentList["canvas1"][0].tblContent[0]); //for getting tblContent info
}

async function saveCss(projectID, name, properties) {
    let query = `INSERT INTO css_table (project_id, css_name, properties) VALUES `;

    for (let i = 0; i < name.length; i++) {
        query += `('${projectID}', '${name[i]}', '${properties[i]}')`;
        if (i < (name.length - 1)) {
            query += `, `;
        }
    }

    console.log(query);

    try {
        let pool = await sql.connect(config);
        let results = await pool.request().query(query);
        return results;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function savePrevious(projectID, tabID, tabSequence) {
    let query = `INSERT INTO previous_state_table (project_id, tab_id, tab_sequence) VALUES ('${projectID}', '${tabID}', '${JSON.stringify(tabSequence)}')`;
    console.log(query);
    
    try {
        let pool = await sql.connect(config);
        let results = await pool.request().query(query);
        return results;
    }
    catch (error) {
        console.warn(error);
        return error;
    }
}

async function saveTableContent(projectID, tblIds, tblContent) {
    let query = `INSERT INTO tbl_content_table (project_id, table_id, tbl_content) VALUES `;

    for (let i = 0; i < tblIds.length; i++) {
        for (let j = 0; j < tblContent[i].length; j++) {
            query += `('${projectID}', '${tblIds[i]}', '${JSON.stringify(tblContent[i][j])}')`;

            if (j < (tblContent[i].length - 1)) {
                query += `, `;
            }
        }

        if (i < (tblIds.length - 1)) {
            query += `, `;
        }
    }

    try {
        let pool = await sql.connect(config);
        let results = await pool.request().query(query);
        return results;
    }
    catch (error) {
        console.warn(error);
        return error;
    }

}

module.exports = {
    getUsers : getUsers,
    insertUser : insertUser,
    deleteUser : deleteUser,
    saveProject : saveProject,
    getTotal : getTotal,
    saveTabs : saveTabs,
    saveComponents : saveComponents,
    saveCss: saveCss,
    savePrevious : savePrevious,
    saveTableContent: saveTableContent,
    getProjects: getProjects,
    getComponents: getComponents,
    deleteProject: deleteProject,
    getCanvas: getCanvas,
    getCss: getCss
}