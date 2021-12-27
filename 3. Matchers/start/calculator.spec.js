describe('calculator.js', ()=>{
    //Specs from previous session
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

    //toBe Matcher
    it('should initialize the total', ()=>{
        const calculator = new Calculator();

        expect(calculator.total).toBe(0);
    });

    //toEqual Matcher
    it('has a constructor', ()=>{
        const calculator = new Calculator();
        const calculator2 = new Calculator();

        expect(calculator).toEqual(calculator2);
    });

     //toBeTruthy, toBeFalsy Matchers
     it('can be instantiated', ()=>{
        const calculator = new Calculator();
        const calculator2 = new Calculator();

        expect(calculator).toBeTruthy();
        expect(calculator2).toBeTruthy();
        expect(calculator.total).toBeFalsy();
        expect(calculator2.total).toBeFalsy();
    });

    //Negating Matchers
    it('should instatiates unique objects', ()=>{
        const calculator1 = new Calculator();
        const calculator2 = new Calculator();

        expect(calculator1).not.toBe(calculator2);
    });

    //toBeDefined, toBeUndefined Matchers
    it('has common operations',()=>{
        const calculator = new Calculator();

        expect(calculator.add).not.toBeUndefined();
        expect(calculator.substract).not.toBeUndefined();
        expect(calculator.multiply).toBeDefined();
        expect(calculator.divide).toBeDefined();
    });

    //toBeNull Matcher
    it('can overwrite total', ()=>{
        const calculator = new Calculator();
        calculator.total = null;

        expect(calculator.total).toBeNull();
    });

    //toContain Matcher
    it('can be instatiated with the right constructor name', ()=>{
        const calculator = new Calculator();

        expect(calculator.constructor.name).toContain("Calc");
    });

    //toBeNaN Matcher
    it('does not handle NaN', ()=>{
        const calculator = new Calculator();
        calculator.total = 20;

        calculator.multiply('a');

        expect(calculator.total).toBeNaN();
    });

    //toThrow, toThrowError Matchers
    it('handles divide by zero', ()=>{
        const calculator = new Calculator();

        expect(()=> calculator.divide(0)).toThrow();
        expect(()=> calculator.divide(0)).toThrowError(Error);
        expect(()=> calculator.divide(0)).toThrowError(Error, 'Cannot divide by zero');
    });

    //toMatch Matcher
    it('returns total', ()=>{
        const calculator = new Calculator();
        calculator.total = 50;

        expect(calculator.add(20)).toBe(70);
        expect(calculator.total).toMatch(/-?\d+/);
        expect(typeof calculator.total).toMatch('number');
    });

    //other matchers visit https://jasmine.github.io/api/3.10/matchers.html for example for version 3.10

    //Match anything
    it('returns anything', ()=>{
        const calculator = new Calculator();
        calculator.total = 50;

        expect(calculator.add(20)).toBe(70);
        expect(calculator.total).toEqual(jasmine.anything());

        //cases where anything fails
        //expect(null).toEqual(jasmine.anything());
        //expect(undefined).toEqual(jasmine.anything());
    });

    //Custom matchers
    //NOTE: They're used to feed the need to cover parts of the code but isd not recomended
    //cause the updates of jasmine can broke them and also cause our teamates 
    //couldn't know how these matchers work
    it('can be instantiated as a calculator', ()=>{
        jasmine.addMatchers(customMatchers);
        const calculator = new Calculator();

        expect(calculator).toBeCalculator();
        expect(2).not.toBeCalculator();
        expect(2).toBeNumber();
        //expect(calculator).not.toBeCalculator();
    });
});