package com.example.demo.util;

public class SuccessRateCalculator {

    public static double calculate(int completed,int total){

        if(total == 0) return 0;

        return (completed * 100.0) / total;
    }
}