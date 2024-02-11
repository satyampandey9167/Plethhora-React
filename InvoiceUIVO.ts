class InvoiceUIVO{
    invoiceMasterId:number;
    customerId:number;
    projectId:number;
    invoiceNumber:string;
    status:string;
    createdBy:string;
    createdDate:string;
    dbVersion:number;
    
    constructor(
        invoiceMasterId:number,
    customerId:number,
    projectId:number,
    invoiceNumber:string,
    status:string,
    createdBy:string,
    createdDate:string,
    dbVersion:number
    ){
        this.invoiceMasterId=invoiceMasterId,
        this.customerId=customerId,
        this.projectId=projectId,
        this.customerId=customerId,
        this.invoiceNumber=invoiceNumber,
        this.status=status,
        this.createdBy=createdBy,
        this.createdDate=createdDate,
        this.dbVersion=dbVersion
    }

}
export default InvoiceUIVO;