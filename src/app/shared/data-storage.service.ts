import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-http-60353.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipe());
  }

  retriveRecipes() {
    const token = this.authService.getToken();
//    this.http.get('https://ng-http-60353.firebaseio.com/recipes.json?auth=' + token)
    this.http.get('https://ng-http-60353.firebaseio.com/recipes.json?auth=' + token,
      {
        observe: 'response',
        responseType: 'text'
      })
      .map((recipes: any) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
