#include <string>
#include <iostream>
#include <string.h>
#include <limits.h>

bool isValidOperand(std::string operand) {
    for (auto &&cc : operand) {
        if (cc == ' ') return false;
        if (cc != '0' && cc != '1' && cc != '2' &&
            cc != '3' && cc != '4' && cc != '5' &&
            cc != '6' && cc != '7' && cc != '8' &&
            cc != '9') {
            return false;
        }
    }
    return true;
}

long long int kalkulator(std::string input) {
    std::string num1_str, num2_str;
    char op;
    bool is_valid_input = false;
    for (int i = 0; i < input.length(); i++) {
        if (input[i] == ' ') {
            // format is not correct
            if (i+3 >= input.length()) break;

            // operand1 length
            int num1_length = i;

            // find operator index
            while (i < input.length() && input[i] == ' ') { i++; };
            if (i >= input.length()) {
                throw std::invalid_argument("operator is missing");
            }
            // operator index
            int i_op = i++;

            // find index for offset of operand2
            while (i < input.length() && input[i] == ' ') { i++; };
            if (i >= input.length()) {
                throw std::invalid_argument("operand 2 is missing");
            }
            // offset for operand2
            int i_num2_offset = i;

            // check if operator is valid
            op = input[i_op];
            if (op != '+' && op != '-' && 
                op != '*' && op != '/') {
                throw std::invalid_argument("operator not valid");
            }

            // check if operand 1 is valid
            num1_str = input.substr(0, num1_length);
            if (!isValidOperand(num1_str)) {
                throw std::invalid_argument("operand 1 not valid");
            }
            
            // check if operand 2 is valid
            num2_str = input.substr(i_num2_offset, input.length()-i_num2_offset);
            if (!isValidOperand(num2_str)) {
                throw std::invalid_argument("operand 2 not valid");
            }

            // input is valid
            is_valid_input = true;
            break;
        }
    }
    if (!is_valid_input) {
        if (input.length() <= 0) 
            throw std::invalid_argument("input is empty");
        throw std::invalid_argument("format is not correct");
    }

    // convert string to integer
    int num1 = atoi(num1_str.c_str()), 
        num2 = atoi(num2_str.c_str());

    if (num1 > 1000000) 
        throw std::invalid_argument("operand 1 max number is 1 million (1000000)");
    if (num2 > 1000000) 
        throw std::invalid_argument("operand 2 max number is 1 million (1000000)");
    
    switch (op) {
        case '+':
            return num1+num2;
        case '-':
            return num1-num2;
        case '*': 
            return (long long int) num1 * (long long int) num2;
        case '/':
            if (num2 == 0) {
                throw std::invalid_argument("can't be divided by zero");
            }
            return num1/num2;
        default:
            return LLONG_MIN;
    }
}

int main() {  
    char input[80];
    std::string input_str;
    
    do {
        // get input from standard input
        fgets(input, 80, stdin);

        // empty string
        input_str = "";

        // convert array of char to string
        for (int i=0; input[i] != '\n'; i++) {
            input_str += input[i];
        }

        // exit
        if (input_str == "q") return 0;

        // calculate
        try {
            auto res = kalkulator(input_str);
            std::cout << "Hasil: " << res << std::endl;
        } catch (const std::exception& e){
            std::cerr << e.what() << '\n';
        }

    } while (1);
    return 0;
}