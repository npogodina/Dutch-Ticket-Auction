package com.TicketTime.TicketTime.service;

import com.TicketTime.TicketTime.model.Category;

import java.util.*;

public class Service {
    public HashMap<String, Set> listUniqueCategory(List<Category> categories){
         Set<String> uniqueCategories = new HashSet<>();
         Set<String> uniqueGenres = new HashSet<>();

         for(Category category : categories) {
            if (!uniqueCategories.contains(category.getType())){
                 uniqueCategories.add(category.getType());
             }
            if (!uniqueGenres.contains(category.getGenre())){
                uniqueGenres.add(category.getGenre());
            }
         }

         HashMap<String, Set> result  = new HashMap<String, Set>();
         result.put("uniqueCategories", uniqueCategories);
         result.put("uniqueGenres", uniqueGenres);

         return result;
    }

    public Set listUniqueGenres(List<Category> categories){
        Set<String> uniqueCategories = new HashSet<>();

        for(Category category : categories) {
            if (!uniqueCategories.contains(category.getType())){
                uniqueCategories.add(category.getType());
            }
        }

        return uniqueCategories;
    }


}
