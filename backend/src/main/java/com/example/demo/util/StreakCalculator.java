package com.example.demo.util;

import java.util.List;
import java.time.LocalDate;

public class StreakCalculator {

    public static int calculateStreak(List<LocalDate> dates){

        int streak = 0;

        LocalDate today = LocalDate.now();

        for(LocalDate d : dates){

            if(d.equals(today.minusDays(streak)))
                streak++;
            else
                break;
        }

        return streak;
    }
}