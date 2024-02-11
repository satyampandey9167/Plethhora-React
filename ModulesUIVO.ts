class ModulesUIVO {
    moduleId: number;
    moduleName: string;
    isActive: number;
    menuId: number;
    modulePath: string;
    customerId: number;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    projectId: number;
    dbVersion: number;
    isAddChecked: number;
    constructor(
        moduleId: number,
        moduleName: string,
        isActive: number,
        menuId: number,
        modulePath: string,
        customerId: number,
        createdBy: string,
        createdDate: string,
        updatedBy: string,
        updatedDate: string,
        projectId: number,
        dbVersion: number,
        isAddChecked: number
    ) {
        this.moduleId = moduleId,
            this.moduleName = moduleName,
            this.isActive = isActive,
            this.menuId = menuId,
            this.modulePath = modulePath,
            this.customerId = customerId,
            this.createdBy = createdBy,
            this.createdDate = createdDate,
            this.updatedBy = updatedBy,
            this.updatedDate = updatedDate,
            this.projectId = projectId,
            this.dbVersion = dbVersion,
            this.isAddChecked = isAddChecked

    }
}
export default ModulesUIVO;