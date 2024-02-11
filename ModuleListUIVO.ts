class ModuleListUIVO{
moduleId:number;
moduleName:string;
add:number=0;
edit:number=0;
view:number=0;
checker:number=0;
deleted:number=0;
// isAdd: boolean;

constructor(moduleId:number,
    moduleName:string,
    add:number,
    edit:number,
    view:number,
    checker:number,
    deleted:number,
    // isAdd: boolean,
    
  
    ){
        this.moduleId=moduleId,
        this.moduleName=moduleName,
        this.add=add,
        this.edit=edit,
        this.view=view,
        this.checker=checker,
        this.deleted=deleted
        // this.isAdd=isAdd
  
    }
}
export default ModuleListUIVO;