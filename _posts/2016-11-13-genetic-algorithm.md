---
layout: document
published: true
title: Genetic Algorithms as An Approach for Machine Learning
subtitle: EPQ Project
tags:
  - fundamentals
  - algorithms
  - machine learning
  - applied computer science
date: 2016-4-13
---

Evolutionary computation is the field relating algorithmic problem solving to biological evolution. These reductionist algorithms were inspired by biological evolution and consequently decompose the complex problem into much simpler and more manageable stages, which are easier to comprehend. Evolutionary algorithms are a branch of machine learning since the algorithm is metaheuristic and therefore will improve and ‘evolve’ from the previous generations.

Genetic algorithms are a problem-independent, Turing-complete algorithm and therefore can theoretically solve any possible problem as long as the fitness function is successfully modified according to the problem. Genetic algorithms are an extremely fascinating topic and consequently I wanted to create this algorithm in Python.

*See project [here](https://acesofglory.github.io/projects/genetic-algorithm)*

# Keywords

- algorithm:              A step-by-step procedure for performing a calculation.
- chromosome/individual:  A binary string which is comprised of genes
- gene:                   A single position in the binary string which will either be a zero or a one.
- genetic algorithm:      A type of algorithm that will solve a problem using operators inspired by biology.                  
- population:             The amount of chromosomes that will go through the genetic operators


# User Documentation


## What it does:

The program randomly generates a binary string and the algorithm attempts to replicate the same binary string
in as little time as possible. A population of individuals is created and each individual is given a 'score'
relating to how close this chromosome is to the random binary string that was initially created. The operators
promote genetic diversity and should improve the 'score' given to each individual every time the program loops.



## How to use it:

- Unzip the folder

- Open the genetic_algorithm.exe file

- The user interface allows you to customise values of the parameters which inturn may change the speed and the best solution to the problem

- Each parameter has a random button feature which will change the value within the scale range

- The "randomise all" button will randomise all of the parameters

- The fitness function has three variants which change how the solution is judged (details given below of each one)

- The crossover stage has variants which may change the best solution (details given below of each one)

- The run button will start the program and the genetic algorithm will operate on a randomly generated binary string


## Process:

1. ```Initialisation```      - A population of randomly generated binary strings are created.

2. ```Fitness Evaluation``` - Each chromosome is evaluated and given a fitness score regarding how close they are to the ideal solution.

3. ```Selection```          - A new population of chromosomes is created based on their fitness level.
                        The chromosomes with a higher fitness have a higher probability of getting selected
                        and therefore the best chromosomes survive (survival of the fittest).

4. ```Crossover```          - The chromosomes in the population will swap their genes with one another (given a randomly generated crossover point).

5. ```Mutation```           - Given a certain mutation rate (probability), each gene may invert (0 -> 1, 1 -> 0).
                        Repeat step 2-5 until the best solution has a perfect fitness or the generation number is exceeded.

6. ```Final generation```    - The final/best solution is generated.




# Technical Documentation


## Parameters:

- ```population_size```: the number of individuals in the population
- ```gene_number```:     the number of values per individual
- ```mutation_rate```:   probability that a gene may mutate
- ```crossover_rate```:  how many individuals will crossover and breed
- ```generation_rate```: how many iterations the population will go through (it may break earlier)
- ```crossover_type```:  which crossover variant is selected
- ```function_type```:   determines which fitness function is used

### Note:
- A high mutation rate may significantly decrease the best solution since the genes are inverted which change each chromosome in the population.
- A low crossover rate may significantly decrease the best solution because the genes aren't inherited onto the next generation.


## The variants for the parameters are:

- ```single_point```: the crossover point is a single randomly generated number within range of the gene number
- ```two_point```:    the crossover point is two randomly generated numbers within range of the gene number
- ```uniform```:      a crossover mask is procedurally generated and the population may invert their genes depending on the crossover mask



## Fitness functions:

Fitness is a measure of how close the actual solution is to the ideal solution. Each chromosome is given a "score" depending on how far it is to the best solution. A perfect fitness of 1 may not always be achieved if the parameters are irregular and high. Fitness can be measured in several different ways (see below).


The fitness function is the main contributor towards the time complexity. The fitness function is problem-dependent and the more complex is the problem, the bigger the time and space complexity. The algorithm with binary strings is O(n*m*g) where 'n' is the gene number, 'm' is the population size and 'g' is the generation number. This time complexity ignores the fitness function.


- ```Fitness function 1```: 1 divided by total amount of bits that are correct between the ideal and actual by their position which is added to 1 (independent on length)
- ```Fitness function 2```: the total amount of bits that are correct between the ideal and actual by their position divided by length of the ideal (dependent on length)
- ```Fitness function 3```: the binary string is converted into its denary equivalent and the fitness is how close the denary actual is to the denary ideal




## Timer:

This is how long the algorithm takes to find the best solution. The bigger the gene number and population size, the longer the algorithm takes. Population size increases time taken since there are more chromosomes which undergo each operator. Gene number increases time since there are more possible solutions/combinations - 2^n where 'n' is the gene number.



## Initial average fitness:

An average fitness of the population is determined at initialisation (generation 0). Each chromosome in the population has their fitness determined which is then summed together and is divided by the population size.



## Final average fitness:

An average fitness of the population is determined at termination (generation number or earlier). If the best solution is found before the whilst generation < generation_number, the average fitness of collected off the last and current generation. Each chromosome in the population has their fitness determined which is then summed together and is divided by the population size.




## Ideal solution:

The ideal solution is the expected outcome to the problem. This ideal solution is a randomly generated binary string and represents an answer/solution to the problem, however the ideal solution is dynamic and will change each time the program is run. The ideal solution is compared to each chromosome in the population and is therefore the basis of the fitness function.




## Best solution:

The best solution is the chromosome with the highest fitness (perfect fitness is 1). If the perfect fitness is achieved within the generation number (generation < generation_number) then the current generation is now the final generation. If generation = generation_number then the program will terminate and the best solution of the last and current generation represents the overall best solution - this may not be fitness 1.

The best fitness each generation will vary and it is important to note that the best fitness of the previous generation may be higher than the best fitness of the current generation. The best fitness is dynamic since the operators act on all of the chromosome until at least one of them has a perfect fitness.
