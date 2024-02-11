class RoleUIVO {

    roleId: number;


    roleName: string;


    isActive: number;

    createdBy: string;


    createdDate: string;

    updatedBy: string;

    updatedDate: string;


    status: string;

    createdByRoleName: string;

    createdByUserName: string;

    updatedByRoleName: string;

    updatedByUserName: string;

    customerId: number;

    projectId: number;

    dbVersion: number;

    rolesAuditId: number;
    

    constructor(roleId: number,


        roleName: string,


        isActive: number,

        createdBy: string,


        createdDate: string,

        updatedBy: string,

        updatedDate: string,


        status: string,

        createdByRoleName: string,

        createdByUserName: string,

        updatedByRoleName: string,

        updatedByUserName: string,

        customerId: number,

        projectId: number,

        dbVersion: number,

        rolesAuditId: number) {
        this.roleId = roleId,
            this.roleName = roleName,
            this.isActive = isActive,
            this.createdBy = createdBy,
            this.createdDate = createdDate,
            this.updatedBy = updatedBy,
            this.updatedDate = updatedDate,
            this.status = status,
            this.createdByRoleName = createdByRoleName,
            this.createdByUserName = createdByUserName,
            this.updatedByRoleName = updatedByRoleName,
            this.updatedByUserName = updatedByUserName,
            this.customerId = customerId,
            this.projectId = projectId,
            this.rolesAuditId = rolesAuditId,
            this.dbVersion = dbVersion

    }
}
export default RoleUIVO;