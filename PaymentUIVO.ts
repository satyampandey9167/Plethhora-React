class PaymentUIVO{
    transactionId:number;
    fromCustomerId:number;
    fromProjectId:number;
    status:string;
    transactionDate:string;
    createdBy:string;
    constructor(transactionId:number,
        fromCustomerId:number,
        fromProjectId:number,
        status:string,
        transactionDate:string,
        createdBy:string){
            this.transactionDate=transactionDate;
            this.transactionId=transactionId;
            this.fromCustomerId=fromCustomerId;
            this.fromProjectId=fromProjectId;
            this.status=status;
            this.createdBy=createdBy
        }
}
export default PaymentUIVO;