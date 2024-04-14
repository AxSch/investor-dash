# Thoughts...

I enjoyed doing this test, primarily on the basis that I haven't used React + Python,
in a while and very much enjoy the combination of the two. With this being said, there have been a lot
of changes that have happened in these two. Namely, I did struggle initially to get things working,
namely node fetch - which I realised I was using v16 so included a .nvmrc file - redux toolkit & react-router-dom,
also had some changes. I actually forgot how criminally bad the react-router-dom docs were. However, got there in the end.
With rtk, I ran into some weird typing issue with the slices and removal of actions, leaving the reducer as:

````
reducers: {}
````

So ultimately I left the unused actions in there. Any ideas on this would be great!
The removal didn't affect functionality but namely became an eyesore when opening the file.

I also struggled with the vitest setup, not to sure if I set this correctly to load & use certain chains & prototypes.
Reason why I chose to utilize this instead of jest was because of it's pro's but I also like to learn things & challenge myself.

If given more time or more that I allocated more time, I would probably write a test for the fastAPI backend and also
tests for the InvestorPage & more in-depth tests for the both the InvestorsDashboard, InvestorsTable & card components.
These would have tested the data fetching, error states but also more of the UI such as mobile view & the amount of elements rendered.
