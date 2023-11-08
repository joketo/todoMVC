package com.example.todomvcbackend.controller;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.example.todomvcbackend.model.Task;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testListWorks() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/task").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
        String responseAsString = mvcResult.getResponse().getContentAsString();
        List<Task> tasks = JsonPath.parse(responseAsString).read("$");
        assertThat(tasks).extracting("description")
            .containsExactlyInAnyOrder("Feed the cats", "Water the plants", "Grind the coffee beans");
    }

}
