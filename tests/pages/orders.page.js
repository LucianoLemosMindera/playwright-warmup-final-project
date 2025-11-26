export class PaymentPage extends StorePage {

    constructor(page) {
        super(page);
        //this.catalog = new CatalogPage(page);
        this.pageHeading = page.getByRole('heading', {name: 'Purchase Orders'});
        this.ordersEmptyMesssage = page.getByTestId('orders-empty-message');
        this.orderDate = (value) => page.getByTestId('order-date-' + value);
        this.orderPaymentMethod = (value) => page.getByTestId('order-payment-' + value);
        this.orderItemValue = (order, item) => page.getByTestId('order-item-name-' + order + '-' + item);
        this.orderItemTotal = (order, item) => page.getByTestId('order-item-total-' + order + '-' + item);
        this.orderTotalValue = (value) => page.getByTestId('order-total-' + value);

    }
    
    /************************** Assertions ***************************/
    
    /** 
    * Validate Payment page presentation when cart is empty
    */   
    async validateNoOrderMessage(){
        await expect(this.ordersEmptyMesssage).toBeVisible();
    }

    /**
    * Validate the existence of elements at Order page with products added to cart
    */   
    async validatePaymentPageElements(){
        await expect(pageHeading).toBeVisible();
        await expect(this.orderDate(0)).toBeVisible();
        await expect(this.orderPaymentMethod(0)).toBeVisible();
        await expect(this.orderItemValue(0, 0)).toBeVisible();
        await expect(this.orderItemTotal(0, 0)).toBeVisible();
        await expect(this.orderTotalValue(0)).toBeVisible();
    }
}