describe('calculator.js', ()=>{
    it('should add number to total', ()=>{
        const calculator = new Calculator();
        calculator.add(5);
        expect(calculator.total).toBe(5);
    });
    it('should substract number to total', ()=>{
        const calculator = new Calculator();
        calculator.total = 30;
        calculator.substract(5);
        expect(calculator.total).toBe(25);
    });
    it('should multiply total by number', ()=>{
        const calculator = new Calculator();
        calculator.total = 3;
        calculator.multiply(5);
        expect(calculator.total).toBe(15);
    });
    it('should divide total by number', ()=>{
        const calculator = new Calculator();
        calculator.total = 90;
        calculator.divide(3);
        expect(calculator.total).toBe(30);
    });
});