import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'A super-tasty Schnitzel - Just awesome!',
      'data:image/jpeg;base64,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',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Bif Fat Burger',
      'What else you need to say?',
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFhUXGBgYGBgYGB0YFhoaGxcXFxcZHR0aHSggGBolGxgaITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy8lICYvLS01Ly0vLS8vLS0vLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPMAzwMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xAA8EAABAwIFAQYEBAYCAQUBAAABAgMRACEEBRIxQVEGEyJhcYEykaGxFELB0QcVI1Lh8GKCMxckU3KSFv/EABoBAAIDAQEAAAAAAAAAAAAAAAACAQMEBQb/xAAzEQACAQMDAgQEBQQDAQAAAAAAAQIDESEEEjFBUQUTImEUMnGRgaGx0fAjQlLxYsHhFf/aAAwDAQACEQMRAD8A9xoAKACgAoAKACgAoAKACgAoAStwDcgepiobSJSbGHMe2BJUKV1IrlkqEmV2L7U4Vs6S8kqmIBBPv0qqpqacOWXQ01SXCBztKwDp1AGJuQLfOolq6afILTTa4F/z1sXOqIBsJMHYwLxRHUwfBD08kcZ7QtLBKLxvNo/z5VK1VNg9PNcksZk3MFUHoas82PcTy5dh9OLQROtPzFPuQm1i0PJOxB96LhYXUkBQAUAFABQAUAFABQAUAFABQAUAFABQBxagBJMCobsSlcpcy7QNokIUFKSNSgLkDistbVRh8ryaaWmlLlFAznuLeKFpAQ2r8pI1EckRtA86xx1dWdpLhmqWmpQunyV7GcuBboc8QSTpQN1dPFWZ6pqT3l/wycVt6kbCZliFrKRcKkBPKQTMzyQKrp6iblaI89PCMbsUrK8KlSkqSg8hOmHNRnc/mnpV26G5p/Yq9bimvuZRGXhJcQtsh5VmkareImCY2iktG+1rJdd2ungvMpxjuHJbxZTq0yhROqI2SCDKalPy5Wf7iSj5ivH9iVmGd6mUOJIBVKVIA3B5VPp9aKlVyjzkmnRUZNNYG2s4Wh1pl0KSFGAVfBBtPmPSq0pxtuwh2oSTccsl4l3RiE4dL+jXeUHVB3CYOwPrV2Yztu57FNlKnu28dy3wzr+khKkBYNlAySdtJBgitEJVFw/9meUab5Ras504khKxNpJO3086ujq5RajNfiVPTKSvFlvgsxQ5tY+f71sp1Yz4Ms6cockyrBAoAKACgAoAKACgAoAKACgDhNAFbj81CQQjxGD7Vmq6hRi9uS+nRbauZ9Tq3imTpTuqCZPSesmuV5tSs1udl1/6OjshSTtljTuGVqUdgopCoiSTaSfSKWpGb62V0uSYSgkuryLxDWhpWiVD4Y2Cb39j5VLShSbhlcfT/ZCbnUW7H/ZXnBa1CABaABYVialUdkjUpKCywwmDSTclI6jrU0YRb9bsiKs5JelXGse2Q6BB7s3jn57itE5bXj5exXDMf+RF/lyZWQlRP5Ootck+tKoQd8P2GdSStle4zicrDiEhKAXYkmTsBeQf0qdqlFKKyHmOMm28CMvy1shMonT/AORRUehgR0mppxjJcccsipOUXzzwiNjWlpc0H4UKlINwBM2mqqicJNIuptSjckPPFeJ75tKZO6NM8X/eplVc57lj2FjTUae1sucYyppRLSUGfEFbEKO/1rTNOErws0/1M8LTj67r9iSzjAg/1FCVkaFfmPUGBtU79jvJ88d7kbNyx057FmxCD3at17EJITG9+JrVD0O3czT9S3di6wOKsEm9pB8q305XVjHONsk+rCsKACgAoAKACgAoAKAOExQBSYzGqVITPltesdetbEeTTRp9WQWkKIVPMkj9K5i8yd7v3Nz2RtZDqsKNWpP5rqPpsKedJN3j1yxI1Haz6CnGL/f9KWdO7wEZ2Ql1nZJ2N6JU5RtB8PJKmn6l0wJOHqvyhvMG38NcaRbmpnTWNqCFTuNYjCkII36jpHP0p/Jahbr2IVVOX/ZBaTeZube1Z97vyXWVgZwtwQLAXvFtjFPCnd3XQWVSyIasMATp2Nukiq2s4ZYpdxrGNFe94EVE5SlyNCy4HcC0EIPh8WqQrkW2FNTaUGmuvJE8yTv+A9h4Pxb9TTQlG+eSJXtg62024tKVcKkE7bf78qdOE5KLFblCLaLbAvlbykydGkieJB3HStVKe6tt6WZmqR2079bl0nDi0WiwiujGCxboYJSeUybh3tUg2I3/AHFWp3EasPVJAUAFABQAUAFABQBVZziTp0JMTueY6Vm1VV04Y5LqEFOWSBh8NzJnmubGknl8myVR8dCUhNj8qujGyf2KpSuxwQPIQKtSin7FbbZExGOaSTKh6VRUrUYybuWxhNpIr3e0LI6+VU/FQ6Iby2upXYntc0CYSo+xgfSs8tVnERXOCw2Nq7TpPIHneNpj1pHqiPNpkbO+1BZbW4rSQEhXhNyJAn0vSQ1NatU2RXIvnwjbGCowHbRDqJSIHKiISOsk9KacKsPTJK/sXfEweSsf7eqBOlKVJk3Bg6esdathRnbLyJ8V7F9knaVt9NlpCrnSqxgGJp402rpsdaiLJBzlrVB32gbzSbclyq4wScrxzbyikKAP9psf81NKG52bJnNxVyyVgDEWNWS0srW5FWoiIUxCYgA9aTy2lZj+Ym7j+WO6THXmrNPPa7CVVc0WGdBJHSuvSmm7HOnHFyQ2rxeoj9R+tXXKyVUkBQAUAFABQAUARsTjm0WUoAx/vpVVSvTp/PJL6kqLfBSN4lKpJUkkmYkT5VzJ141pW3L7m2MVBFihvnYVtjR6sodTsQsTjmgrQHE6o+GRqPtWfUVqUVbdnsHqirtFE/maXAoFfiRYxYA++/rXmtTqJTktzz0sPBvoYzPMOpyShxSVXgyB9+KejXaleauWPc+CqwvZ/EPrShzFyEAnwiBxz18zWyethGLcYfdiSjNK7LrGZXDKkIxJAAOpYGpQJ2O9haKyw1F53lG/sZ5xayzO4nAvuJHdYptwAwBACjYzJBiZ6itcK1FP+pBp/kJYeyXKFoLheWXCpAQWwmyAbrSR8hPkaivWU0lRjazvfuKQc0fbR/SSgjSISmDpQByTsLXp6UKknuk/3ZKuU2Zqw6W9QJUqBdItPM9K10FWc7PCGtYrcnfUTr+FCTOqwhW4961V4qPp6sEy0Vm2JlClAQZ1L/PAM3vGx3is/lUm5WeRlORLYznSvWTfdKh0BsbVU6MuhsjVXU2+RdtysQpaZ2lYgf8A6H7U3mTg7MPTLgk5j/MMRdKkBvjuSFD5zJqKjqTV1x7ERkoisuaxaFQtz2UisclKOLWLfNTNnlru0qE8nrWzTt3V5FM5p9CzRi0hcnr9IIroR1EIze7BRJXSsWrL6VbH962KSeUVNWHKkgKACgAoAZxjuhBUN4t60lSW2LkSsmHxoWpRJUTPPNeM1cpV5OU2a42iR8MkIvICuJ39qyUZ2TcXlDPJXZ5muLSiy1HVZKRF/fgV0qOq1E4pTljuW06ab9KyRcjyQIWH3nVLdgwEiEJkEEj+43N6eXqjthhfmXPR1J5lgtnsF4ClDZg3JvM+tI9BK11kenpqaeWZLMWFkkBMRvNJTjt5N/wEbYkVzCXmjqSspB6psY6Xq+WyatJFb8OziRZJxb640AJXNzHhI5ChN5qmnQin3RXPw9JWcjmYZK3q1jDhB38JI+o4mrb1YLa5Nmen4ZB/3EfG47EHTASI3MSSNoNVU6NFXuXPwqPcSvMZEKZQbR6/4po0bcSKpeFpcMre8w6SdeGkHhJAH2rSlVfyzM8/D2upxWJwtwML4SIIBhXqlQ29wRVtPzYu8pXF+BxyaDs+jCR/wDZkOFJWNI1bQAraLViruq5+jH8/IplpZxdrXIvbHLcCpvUgBThTKS2oIIPAIAjT61ZodVqYytU49yVo6ssJWMQnCuIRAGoAzcTHW42rpupCcrhPTVaayh1vO1tFPcrWgzJAVafbipjRedxncrcGy7K9qMSsr1uBVgdKvEOZiaxaqcqVtr+5Dm0i+cz91I1BKSkX2MHysbVijqJN2wHmMssJ2tbcTC0EA73sK0y1bUXGcbk3TLXDBb7gLYMaJCtUpIBttVNOFfV1v6cnCy+v7CPdds2uFSoISFGSBevVQTUUpckPkdpyAoAKAGcY1qQU9aWcVKLi+oGWzHDFo+L1kdK8xrdJLTq/KNUJKWDNuYYqd1SeY6f4ripN+hLkujB3uSPxyVmUnwt+Gep/MfTiunB7bRT4OnQ07jHKyzpzdhrxalKIEQANPlE7VrpVqVN3u2+3T8DQ9NWqq1kv1GDnynCFIbdHqQlJHy+tLW1sVJO7X4r9CPhoU01OUfs7kF4rVdemesz9qwT1SlzktWopQxG5Bcw0iCqRURrLqD1seiF4F5LShItO+5jrWulqIJ8FNWupoazbtMJgNqjrG96vnLzflsRRlThzIo3s8T1seo2qqOnmanqKXcZazNsm6gPSmenkugOvBrDI+KzJChHhtyN6shRkil1IN8iGcWmbxHpTOnIjdEuMNicMRePn+4qfLj1Fcn0GXm0uE6FCAN1EJ9Beo23dkWbrLIjKGQp0IJgHc8fekaTaTdhp3UW0hvNclSlVwCd9uKffOn6bmSWlp11e2SRkbKC5pUgJ6LHHW3NZa7ltum37HPn4dOM8cGyw/Zv+oFd4lTZMRNgD1FYqbdRKPy55ZjqUpJ2sKxrYOIQ0hLZbQqPD+aQOf0q5UlTq+U3uysrqZ0nusz07CYZKAAABYC1exjFRWCW7j9MQFABQAUAcUbUAYnty8p9otYdUO3GqDpTcTcb87Vz9XKM9q5s8l1OD5IBwsoQlYaQR8XdJKdRiLyozXN1lehOO2Vo/Tk2afdCW5ZITmEYbTp0lUmYJtNcyWrpLFON/dnQVes3duxFU6gAlLaUx5X+dZpVJzdr/AGB1Jvlsr3c3CjpSqVdB4j9K0UfD6k3iItivXmiolEqg3G0TMfaupT8IbzJpGiOllLkiIxj7hGhtRkwDciTxtFXvw7TU165lj0kY/NIlqyPGLXpKJ6+KB96SlU8P/tdxHT06V2yHmGXPNkhSLdQZHtWqk9HJ2QqpUZK6ZDVg7CWxChYk2/zWpU6D4YnkUu5F/lKFG6Lf8TT7aSXIfC03wySOzKFDwNO6rbEkedVupR/yFekgv7vzHcV2RQ22F6nQTeOm3MedT5cJK6ZSqN5NJkfCdn0KMB5Y+R3+VHkJjPTySvuZLb7Jp1lJfUDxI8/Wj4ZCeVK11JnHcjZ4xZJ/+u3yIqt6ZPqWLT1u7LPC9k3lp1JfSR1OpP0E1ytXX09KW2UlfsVOFWL5H1ZZjcO0lxDs3g6VEafXyPWqqFSnUk/LfFvzFk5fLIktdq8waCg4kLQd9YBB635rZCvUV0pX+pVKlB8r7HewueYJrFlStaUqJ0BUFKFT9uKmi4xrb5x+j7fUist8McnruEzjDumG3kKI4ChXXjVhJ2TMDhJconVYIFABQAUAQc6WQyojyB9Cb1n1cpRoycSykk5K5mVqbQnWpSQeATvXBhBbd7ee3Jv9Tdkimx+dNKWG21pJ6J5PPtVOo0eo1M9tONo/bJopwcFeRnH8c44CpISgTGpxQF56VpoeCKK/qy/BDuSjyUObYtoae8xJd31JbkpBHFoBroLT0aKtSir/AM6iqsuxZ5VmaEo7xGGShAtK/iUYv4RJ85JFVajVuPogsv8AL8SYNy7mpyHFsOsq0tJbc3hQEHmfSvO6nepf1JSfa3H6lkqlRu9yK5h8PhiXg6XFhWtKVKISmOEp5Hzpoz1FRx22srZt192xHJyupXHcT2kYOvxgEib9QPlN6y/B129yWLkpqOGVLOYBYSogLSrgHjzjnyrbTouE/ddxZVLrBLdSw4nu1EDSBCeUxAGn0mKaMqsbtclYt7B4YgF34gbKHhPlMb+9Y3U1Cfo47clsZWJjONZYbIDgINx1npT0K1bMXHkKnqd2ZlGP1fGVSSYE2rbGG3gjeO4l5tDQKSsLB8Uf7xVlOrVbcb27BKdldMbwrmoFwuglIJ8YEwL2Iqalave13+DJjWshzKcR+MUSpALSeSAIN7CN6p1VepQteV5dh6da69OCRgO0QP8ASA7vRbQd42BrJW0LXreb9SVUjL6l3i8Sk4JaVEgrOgRvfcitegpulF1I8+5nlL+ovYx347EYRWnV3jZFpuI6EcGu5tp1I34NMdlVdmWOXrw+K2a0LSJIA8BHSs04eW8MzVaW0h47IVtDXh1KCweOQeKndBr3M9pGv7H9s3NYZxILVgElUkFVhedprTR1KUtreCipSxdHpbTkj6H1rpJmQXUgFABQBW5tkOHxIAeaSsJ28vlQscFtKvUpO8HYyXaLszhmVILaSiyrJOkK9SL1j1kpqPpeTbQ1NSd97uedjIVvjvTGnWY3IgE2vaayOb2ml+p5LdjsqjTKUoMeKwFr3A897DpSKFRyu3ghzisWM8cM+paw2ZS44EQriDJXHShwi7RGTt6iRgNbSnFlBV3RKVHSVJsb+k/rSTprbaSwCak8MrMxxC1OEySdxJJgEkkRvbp5UU6KgrWwEssQmCAHLTJ+ESbdPP8ASrEoxId5ckbHogpLWwIEA6VDqSRufSnWyS9RTJNPBMxryVKSpCz3mxMqChYGTIA+RqtUkli1h8P6jSHVuKCHXSBMzqiR1871CpQUrpfkTbGSCvDOpfUgXEmFAyCOtWyVPbYpSlcRmmKdRB1HUkhQgcC8EdOtRSoweGgqXWRt3O3nrBelJF9IsPOd6eGkpQy8/UTfKQ2pSkkhTqlRKSAoxOkHrsZ+9XeXG/CBPBa5DmZShaS8G7eAqE+LieY86oraGlUldoaNVpYJWWKl/UsIUq+oqAMkX+tx8qiFKmvR0GcnykaXC5j34aQnwpSrx6lEaCUkQYNzY0y0sLWSRDnm45meCWlIfw4C0JBBlI1E6ylSj1Ag7irPhIxV49CuNZ3szN9n84ew2KQvvClJUAox4VJBGoEc26VVWi4rellcF2/zPS2fRKWWnEhWhCgQCDAIvXR2QmrtI5t5Rdrkd/IsMv4mUewj7VVLR0ZcxQyrVF1JWDwiWgUoEAmT6wB9gKup01BWQkpOTux+nFCgAoAKAMN2heLxJUrQhMiZAgGx964Wp1LqVHC9ldL8bnQow2JNcmdwrjeh5tlzxJVAJkiY1GZ9xani0scmqV8Nkhp9TDSlKiYBja5tPQHenVRJXYrhulZEZGHSEqdSDClBW86lExYbgwBUtWyRuvggZm8tBSyTDrrii6dhoBiCRYkiPKpaurS/EmLSd0sdCszbKGkqK25uDMSSdwoyeJIEHzqmtCSSUXdllKabu8HGMsbcZmQpxPxD+xMWkdTtTKi0r3IdS7sVrqkpmAdvyyJM/v8AWqndOxZdCloaWUEA6ovIgyePMVY8LbEVc3YrMMKiAU8AyJttIpXFoZNdSNhFIhSugJSLxEXAP71pUYtGd3TuNjDnuFLSogEgKv0vH03qqnJ3zwNKCsRU4QBlRb8OpUJsCSOdrbWM1ocluKdr2jDqUAJ1SFi+kgwY6xY3ouRYbwik4g6SEiBv+gih+jIL1FrhMBrJWSNalDTCtK9rAx8W21t6dTvxkjbbnBq8qaCXoSlvvoKZHgkgEGU7a+ihS73uTXIOK2u/BOxa1MYgKClBp4aloUqSFLB1BIN/ivbnyq3zpJ3t+BWqUWvoZLOsmUnDFV4S4C2sDcLJnV0Ijf2pVNSgO4uMj1X+FOMKsIhJM731TyeOKfTXUbMq1SW66NzWkyBQAUAFABQAUAYXt5gUrlIuFDxp4Hna46+1cDxOdClVjJv1HT0MZTVuhmez2HbI/wDCrUBoUoyEqKSSFW6zFUy1enhC0mv59MmrZU3XHe07JW0oQ4DEQE6gRYcc+tLHW0KtnGWezGjBp8FThczd7xhsJIbAlxSkkXSdQP04rdGpFxVnnkqlCzbZC7ZNfi3IQpKCkakkq0GY4B39utSq1nexGzFrkPJsQ+6yGFrHeCVbCAkEGSR1j71M7WvDgI3XzckkO6HE+FaZIB1CO9UARbaEgEx6CldTDb4JURWKYU1hySiFPEJEkFQAMpjoTSXe1K3JON1+xQtsFKgVKgyZE8iTxzE+tNGN3gHLBIxGJS3YAr+LSqZv1+ppldyuQ3gd7pKmoULz4CFBJNub367UKdmDV0MYjBltJKNx8SSbcbdaeFXORJQxghqdQUnUNJAA0i4JG5EcHr5mrHngW9uRzMgdAUoQAmw8ov8AOq1dyGlZRuZ7IUa3iQrTFxzAv9q1VbbUjPTve5cYVtSlpKF+c9CDJmqHaxd1N7leaNrcAUNOsE6yYGoXHmm8nfirINOyZXJNJtF066ximkuAoKxZaD4lkDVChB8KgNuDVkrSV0+CuN4Ss1gqu1eCZcwmpt3u1gCykkaouEqiyVcg0ijBpfz7ll5p2Lb+DWMDjewCjJIAgQBpBPmTU0JeprqJqV6Uz1CthhCgAoAKACgCrzzH92nSn41fQcmuT4t4h8JS9PzPj9zVpaHmyu+EYnHZwy2vu1EqcIJ0gif+xJ8PvXmNFoZau9WrK36s6s6jhiKIWG7VJDiEJaKFEpBCiklM+lXPQVdPuqxaxx1/UNyqell3i3VqG9h5CuW9RUmkpZt7F1OEYsqFoUbAI9YIP0NaVqNsbWt9C5xXc6hpsJAcQhWnZSVFKh85FbqPiEdqjKDx1T/iM06DbvF/g0QnWGJKmVhClCCStKgRuOLXq2OpqOVoRdv+X+iNit6rfgDmQ/iG0EOyps2IVMKG9twfLzqZamr80Kb7c/ouRbRWGyszfsgsme8NphJJEHiq4eJqErTptfz3H8nerqRmMX2XxQ2IJG3ij9K30/EdP9CuWlq9zmXdnsYlKgtEyIEqBH7j1p6niGlfD/ISOnqocRkGKGmUkgTaRFVvXad9R1QqEw5Q4QNSilXIKSR8wYpoamg18xEqdTsQBkzkFISrVG4Gx/arI6qFr3EdGVxGYZK6uCsnwiBwItuPaljro3wNLTNrLKFGUvsqKm0yI3H+a2/FUppKTszP5FSLwsEvDKKACUqSoxNpFrW56VE5J8O4RTXJOZxSibEmL3Bt5n0NI5JKzLErsvcmzHunQSNepKgRNiIgCRTKTi0+UQ4qStwaZWRYnMUlDJ7ppQSXFKHg1jYJ5PhtNXQUp/Lj+YKZyjT5yzddh+yaMuZLYVrUTKlRHsPKtNKlsu3yzJVq77LojSVcUhQAUAFABQBkM0c1OuK4BIHtavAeM1XV1kk+FZHb00dtFe+TzTPES2+4tohZWQlUgTASqZjpx516OlGFOmox6WX7kO7lkwmUl1WJbdvIcRebmCLRuRFa6ii4OL6ooV910e1YvNFQYACSRfrMRCR6jevPR8MquT3ySTfQ2KpBZSuzG5xjX234lWjUfCIlSesxCa6MNDpocq9hZV6kuB/O80YewykslSVpSmSRBInxRex9q1KjRjmKKXKo+WUvZ5kJdClulCUhckmypMJEG9hVu6N7CuLtc02a9yy33TI16NJLiTBBNkyeTNZ68It46dUW0XK2fsJyvtKvvQ3iSVJIIK1GCgiCNhBtNZtToo1/VUef0HhU2Ygi8/prghQKTsoc15+VF06myTwblNuN0CBFhVDGHMYyENh1RGkzzG29XqhPy4z6NtfYrVS8nHsYzNe0aNUIN+JG/pXU03h0mrz4KqmoSwiDmnaNxC0ttGUuRMkC54vXTpaGG1xTMlSu9ydjjufPJE6AoouocRPQ2NU09EozumWTr3jZoucmzHC4hQSlSQo/lvE9L/CfKufqqNaObW/Q0U6kLYdzZZX2PZdJ1JFotO/+9au8K089RKXmPjp/Ohm1ep8tLb1JGB7JsJfLakAiJH/IcfSraGla1sqNV3Vrr3Eqap+Qpw56kh5vDsOqDTKCoaUkWK7zEdLCfauqtOqd/KXHfrjoZPMlNLezUZc+lSBEWsQNh5VtouTgtys+yMlRWkS6tECgAoAKACgAoAx/ajLHe6d0XmTIMGFKv7gGvManwiq9T511tTv7nU0+qjZRfPBl8wYC0d2siIKhO23hvvNhWqccrPF2XQfP2MT2Rw7n451S/D3aSCmNyRpR6Rv7VqUlsTfUqlF7rI0TTivxa9SVFHBCSZVHxDjePXSKVNbiWvSWuapChDmHWpIIT4iEpJNgQRdI2M9SqrKkrNenBXTV085KXH9nsPh0pcW6QlZUDpWHIIuRqI8RPnSTpJZbLIVHLCRn8SlgKQhvWXCNQvqmd4jj1qlp5ssfgXLpdnGMtUC/3rmhwAaRIJurY+YA+1WuKt2Eu7ncSruREFRNpUZO/iPWljeTvImVksEjLMf3YhJEJNwD+/N/pWfVaaNbnnuWUauwu8H2ha0lSlgAbydq4lXQ1FLakbFWg1e5BzDOnH0lIMNabKsRc3t1t9a6ul0vlRW557djJOak3tEowKVtiNIITIUeLiY3JrbHsUywZrN8WgJ7vu+9cCpBTNiJm0HUK1U1hlFR5QvLmVOIJdKkg2sARHOon4YkfI1CimybuxJyTAIbnXBVq1FQmZ3AHnS1JdGTCNj0rs7mqltJUFQoW3+9eUqSrabUJU5W7fTsdBwhUjdrk0Lr5BQrV+WNQ6fpe1drU1p/05xeeLrt/vBhp042krGNy3PU4jGOOCAlatHiHKFENKn8wk8bSK69O8pb3j2M00ox2o9EyhaUwhOxkjz/ALr9K04WDM03kuqYrCgAoAKACgAoA4pIIgiQaAMT2pypDUd3fUSrQdgIjwnjeuXrlCkk729mdHS1JTbuZXEsuMlSxusJSE9QgEkAjc83rJHUNwuka/Lju5G8NiAtYZcUpLqzq0kFPXZXQDbzq6LbfZiSSSv0JmKccbaLSlaleI/AVBQ/KZiANI+lXOpdOMilRV1JGZGI/FkgogQuW5uPDKVRHwgfes03u4X7GiPp6l1gctawz+H1FuQgkxeAfiuP+sdZrThPLKG21hFUpLIJW4TrOpxJkEFOogTOxFr+dVfKsF178mc/myXnFAtphJtBJNrTHSrlBxVyp1FJ2EnDKKfA2UgAyrfVsYMnk1POSHgVluWh4Q4gJk3Bsrrv0jilfpymSvUsoj4jKnMO4otnW3MFM+E7RHmKfdGSs+RbSi7rgnYVh8EKXpShSTAnUYPoLc1XKEVwWRm28orXCQ7q1q1iAk/mEfrTOTsJtVy5cKLBs9EkqlUmPiji9opXtvYZXsO4d5KSEL/uFztffrf9qMLkM9CwweZd06gNDUFHxe0wb81j1ejjWW5crgto1nHD4LbtJnDj7Zaw+nShOpxWoBZm8Acixp9HpKm1ecldXasVVakU249TMpccbQ2pJgAa9MXkxpMxtA4rc54wVRjnJ692GeL7aXp8OkSIjxgQfW1X0W5Z/lzPXSjj+WNbWgzBQAUAFABQAUAY/tx2ncwySlopSQLqNyPIDk1j1GolB7Yo16ehGavIpMnS8tAcfWpbq/EZ/KDcJA4FeJ8T1s9RWavhHWpU4044JD+WFRSoGCDI5vVOm1NWjZxRY5wkrSGcdky1i8dZgT6g7iunLW11mUCuPlcXKfMMG8kgoGlISRAJgzAO8zsKuj4pGfzKxK0y/tZj80exSHwtLOkaShRRuQYGo9SBXQo16EoNKViqdGpF3tcmtYjQzpA5B1EEFJSbAC/N5olOVsWBRXUpMXjVKSluUwCSTwTEAVdGbtcrkkPZbjUtoVrgkgxsCLfWTHyqZTvwiIqxDwmbKSSASTfnYcCrG8XEQrE5yrSAFhKgT8O/v1oWehLfuVzeMXYFXJMqO/NPZPgS7JTeY2lStRIgJJ+EeUcT96lrFyExxeOCx4kyq35bnzmJquTaQ6VxWHK0iUo6xO4Pl9Krco9x1GXYWnCOup8Qg71U69OPUsVGpLoPM5C8qLlPG+19x7UktdSiMtJUZa4LsribhHj2kwZpIeI+Z8sWwlplD5mjXZX/AA+WqFYhzQ2BZI+I3G87VspUqk1ul6V78mWpXhF7Y5Z6TlGESw2lpAASkeH9Z866FCDpx2vPuYKst73E+ryoKACgAoAKAIGevlDC1JmYgQY3tM1XVdoNllKO6aR5VhWDinghQ1plTmpXASY28yTB864GsrOjRd+Xx/PY7CSvdF1nWNKAGmlBKjMrPAHTz4rh6DQ+fK7wvfr7/QslKy3MscC44WUFZMgQT5/53qrX062nqbb+lcCQcJO9hvEKPJNYt8m8tmmCXQiOJPU06kXKwhDercT7TTOT6EvAheDQbaBPlFPTdSTsiN3ciLy1gHxIAjewq7zKye1thhq6QJyTDKvobPqBULU1+NzQrS6oac7N4Uz/AE2x/wBRVkNZXv8AO/uyNsP8Sse7J4a5CQOea0Q8Qr/5CujT/wARnDdnMO4sJgAnYqJA9zWmjW1FWSinyJUhTgr2JWJ7HMIA8TZk2KZj3NaairU1maZVCUJPERtjJ2kmBB9q509RN9TXGKXQlO5chF/CR5G9LPelyNCSfQfw7aJ2FZpuRaXmCwSDcgAc0lGLnL1vC5M1WpJYXJeI0slI0lKF2AG6j58xXpqfl6RppWjLHu37vt2OXLdWTzdr7L/0cewgfSSUmU2GkwJBsfpVtSitVFykndXWHyLCp5ErJ4ecj2UqWhwNLM6bgz1G33pfDviKNXyKuUsp/XoLqvLnHzIYuX1dw54UAFABQAUAVnaRtSsO4ExMDfoCCaqrX2OxdQaVRXPIGw6vF6GHe7WAS7pEynYbi/r5VxnQjWj/AFFdHYqNKyLbPMscKmmkOlBBlSjBUU3USJsDNqu8uEHhcFKk2jR9nHwoFCl6jYm0AEfuKq1FOnVp+vo0/sLUjKLwXeJy5DpBBjrVOo8Lo6qSqQdu9hKepnSVmZ/H920TLidPWYHpevNVtOoVXCnLd9Do05ylG7VjNYjte13gZZlSjuq4QOnmb9K3afwqtKO+WF+Ysq0U7PJjcfm+KS+e8egXgJGmPb967VHRUFC0Y59ymdeafJTsZziXXlI/ELIIJA/0Vq+DoRhucEUrU1HKykSEl9Rnv1pUlSYhRjcfLf6GjyqP+K+xLqVO7L7CdryFFDja7cgzaYniY8q5dfwtN7oNJdjRT1VsSWTX4IoebCm1hQM+ojqDXHrUp0XeSNUaqkNryoL8IInzMVbp3KcrR5InNRV2QXsGtnw30nzkeR9a0y3pbZBFxllCUApUUqneKpnG3I97q6BYlUSYqOBkTfwwbTrcPgiSQbx+9DhLdFNc9hXWVnblFNgu0yyla25UhskaNlRE6gebX966lXwfdDmzMkdWnLKNZg86TiG2iZSpQlIUeOg9652shXhGMKl2lw74t2HpKF24/j3Nn2eI0E6vUHivQ+DzToX3XfX2OVrk9/BWdpSW3EOtvJavBkTqNhA84mtk4+u8Gl3IpO8Nslcv8rxhcR4hChIPsSJ94rTF3Ms42eCbTCBQAUAFADOLb1IUBYkHbeoauiU7M88fbShanEx3gSUmN/8Aik+hrlzTXB1YSvyMZhqfCEKJSR1EXG46xH2pX65K5ZFbE2iUzjA24lpMJUnpssxMHyj7VEnZ7V/slw3RcmMdo+02iS3KlEbD4Rxc1wZQ1FbUNt7U/wBC+lSUYZVzA/jC6+hWIlZ1aQPyCegsAQea7Wn01KjHbBFFSUpclbmLTiHi6DpE6hAHw7jaeAa003ZWK5xzcju4dOI1qQpSudU3A8x/v0qU3TVhXHeNZQyhhyFzqJ/pqAtBsqenlTOTqRuhFFQdmS30KU2pMeBEkcTHW9+aWm1ew81i4ZfiAls6iJT8Jsd5t96ScLzJTtEn4LGgMpSh7SoHUuPFNiRsN+KKkFL0tL8Qg7ZuGUdsVhRQ9JRI0rjxAefUVz9T4WnHdSw+xbT1WbS4PRGsc2tnYKkAg9eQaw/FRhT8upHKLlSblui8FHimCpU9TWdVdzya1FJWHFYFSTYah+tPOD6CxmrZMv2s7RqAGFAsmdUdTsCegrsaHT+hOfS9jBqKnqe0qMJi+6KXEoKSeRsf0PO9dB3atcoWHdovsszhOJKm3JSpvUppQASZ6QOCRMUk4KfomsP9SVLb6o8mu7KZ4p1JQswsDf8AuTa/2rzOupVNLL+m7ReP/P2NicamWsk3Nc0LLuGTuHVEKBE2it/g0mry3X+vYprxUk0bTs61DeoTCvhmSQkWAvfrXp4cXORVebFtTlYUAFABQAUAec9qMvCluIZUtvxjXHxGwVKZ4kje1c+smp+njqdKhL0er8DPqbK3g2paisAeI7mIHHlM1mlFzllmqM1GOEOY/LlNlS0qSlUAhS5JUSmNJJNtrGmaS5IUnLgdbxyVNAOMNpMARO8bwoX3veq57P7V+48FLq2YTOWZd1oSQmQSkq+djV1N4K6iLvIcrbXh1KcSpW8b6tM7jgg7T5VMtqYsXJqw12cYZJWuEkLMJaA1KBkjYflvUuL2hdXM72hZSQ5CdKgevrsel5p6LYlZIcwut5pttBULXJMkXA1ERYetDilK5Ck3GxFOC7rUZS4RYzcRU7rkbbEtnSUkoiLTG8+nNQ/cZWfAnDspKyLX2BFvO071LWBVzY1GHxZwSJnXJlQPwiLWHHW1c3UaOFaV3yjRGo4o0OExaH0hSDuJE2Nefr6arpperjubadWMkN53mv4dgqIld0pT+UyLHz5rfo5qqlHm32t3Kaq2ts8+bUmDqgqUZkmbmNhx7V3oXjGy4Mbs3ckZkEJIU0SoWlBEBJMix2O1Wbbq6YXs8ok/g2X3WglzutRFlDxGJBuLjreq9/P6jNcD2V491rGBOkjSVIKTFwVC/wBAay67SLUUnG/XH1JpVNrN4vAOYp1KEAwnxhUeEGCLnrPHlRodFKjTVJfV/USpWj8zPRcK1oQlMzAAn2rurg5Td2O1JAUAFABQBxRgUAZPtZgnVI71gFS9ikCSQfrXO1EZSW+Ju084xe2R5/isrxS3Lt4iFFOr+moRtaQIieazqMr8fkaXONsMlsuEa0LSoJQUgBQJUq8R4hvAtUxy7y6Et9EVuPxoefRpKRdXh2QE3BG06/8AFThtysMnZJFEcWA4pIBUO98Or4gIuRI8quh8qKpv1Fl2ZSoqxDa3ynxQhRsloKJkAnfYwNqZ2dhFujcVkmXt4V1egkBalafFqgI/MDzdQPqKXdLbcfar2M/2gaWVlNlC14JJN4v1g8Woov0kVlkey9xDYgqhSgAZIEcJjy8qZ3bFTViO8mACQR8IVaQqBFF08IGmldkLDPaHFLbtqkXTIF7wJ/29O+LMRc3RKcwxbKHm5Wo/ENJIg72HSD8qXde6Y+21mjQYpZXpUQIAiNr+/rVGFdMufcrcx8JhCi2oXBB2PB9aaMFJWeUVykT0Y5bjKUYhYcWkXNv08qohpqdFvy1a4+9tepkMZekSSBp3ChuKv3XIsd1JT1UNxPpEmhRDcW2SZLiH3A53cIAASVWtzFLKzVkHmbXdm0yzsQVOqfeXKjsAI8IsBM8CrKdOckr9DPOslwbrL8MlpIQkQkCK204bVYyTk5O7JlWCBQAUAFAHCaAGnF2oAqsJiSJB4rk060oScWb6lNSSaJacWk72rVHVQlhlDoSXALw6VdOtO4RkLuaK/H5Cy6kpWgEEz0UDvuL0roJoaNWSd0ZvG9gmlzpUUyZuAq9gL71V5LTwy74i6yipf7BuhMhyCCDEbwbT5VFppE+bFkHHdlMapESkT4QZ2SdxEVGcXQ3mRzYjs9gcQn4nkxH/AMcmRx8V6M9hd4l7+F/eQXH1TvCUiPS+1OnJCNpk3/0+0hIRiFyNyoAkcWHpaoV0TvED+Gu//ul+yE/rIovIjchOE/h+pmYxTi5sAUCB5iL7Us5N9iYysON9iVn/AMjy9KeEgCTxO9KrjSncad/h6zqkOOyRuVT7waluXR/kKmhX/wDCIEw66ZHMTPsKG5EqRMy3sawjSpQUpUQZJ3/aoV7ZByL7AdnmQfA2J3Np+9MoJ4Fc2aHA4RIEFOxtV0KceLFcpPks0D2FaEilgp9MwN+aner2RO12uPpcpxBYNAHaAOE0AR3nYoAqcXj4oAhM4ib9a4uqW2ozp0fVTQ9qkVlvdFtrMSFEfCYpFOUflZLSfI5+OcHQ1fHV1UslboQZxzM1C5SDF6u+LmuUL8PF8MSrOeqTTfHd0R8L2Yk5yk2KTUfHR6oPhX3GXc2QRsaWWsg1wStNJCE5o3zapWrp9SHp59Bw4to/mH61b51N9RPJn2FKeRwr2mm8yPRi+XLsJTiUJiCLedQqkV1B05M6cQnqPnTb4dyPLkNLWnyqHOHclQkc78eVL5sSfLkAeRyR8qPOh3J8qQ+3mKE3gz6RUrU00Hw82LOdnhPzoeu7IlaXuxf4txzcwPKldec/YlUoQE4rFBspHJvWzTR5Zmry6EzCY2a1GctGXJoAfFACVmgCqzByBQBj83xZE0AQclz1KVd24Yk2PHp5Vh1dBz9UTXpqqj6Walp8W865F7OxvaugQb/Oq7WZL4Ok0yRA2tQ525qzHUMjLjggH3jypXLuSkQ3I8I25NUSa6FiGXDO1QiRlvcztViZDQ2pwXouibMO8FrVKt2IaYBYpsEZFtvgVKaIcWPsuzTJitDiVSakg7rpSbDZJpRiVhGjIPAE1ZCLvcWTLrDtgXtHP3rXCGcGaUjDZtnwexBKPgT4U+YB3966kI7VY58ndl3lGKJinFNbgVyBQBZJoA4sUAVWPbkUAY/N8ITNAGQx+XmgBWX5viMPAnWkcK49DxWarpadTPDL6eonDHQ0eD7UtqgKlB8/3rm1dDVjxk2w1VOXOC4azFCtlA+9ZpQceUXJp8Cy8n1FKmkNZjeIxA4pJz7ExiQlKmqrllhAdsetG4Noh2CJqUkw4ImnUfSmSJvYZW4Z9Km4WFJVI86ZCsC9apQDrWIuOlMmQ4kgvUMWxwO9d6i1yRDmLSDdQE7X3plBvgi9iSz2lYbFyT5ATW6jQm1x9zJVrQT5KnOO07r6ShoFCDufzEe21b6dDblmOpV3YRXZdl5tV5SbHKMIRFAGtwLcCgCySKAOkUAR3mpoAqsXgJ4oApMXk88UAVWIyPyoArnsi8qAIpyhSdpHpUOKfKJTa4FIQ+nZR96onpKUuUXR1FSPUV+KxA3g+oqiXh1Jlq1tRCfxr39oqt+GQ7jrXvsd/mDnKPrSPwtdJDLX90d/mKuUGlfhs+jQy10OzE/jj/YaheGz7on46HZiV4skfAZ61P8A86fdELXQ7MYL7k7Go+AqX6DfG0xpwu/lT8+aZaCfUh62HQkocciyb0//AM99xfjl2OOJfXzHoKtjoI9WVS1j6I4nAOndSqvjpaS6FMtTUfUcRkhO96ujCMeEVSnKXLJrOReVMKWOHyPyoAtsJlEcUAXeEwMUAWjTcUAPCgDtAHCKAG1N0AMrwwNAEZzAg8UAR15aOlAEdeVDpQBHXlA6UAMqyYdKAGlZKOlADZyQdKAEHJB0oAP5H5UAH8j8qAOjJB0oAUnJB0oAcTko6UAPJyYdKAHkZQOlAEhGVjpQBIRlw6UASW8EOlAEhGHAoAeS3QAsCgDtABQAUAFAHIoANNACSigDhboASWhQAksCgDn4cUAJOGFAHPwooAPwwoAPwwoAPwooAUMMKAO/hxQB0MCgBQaFACg3QArRQB2KAOxQAUAFABQAUAFABQAUAFABQAUAFABQAUAEUAEUAcigAigDsUAFABQAUAFABQAUAFABQAUAFABQB//Z',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 3)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipes(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredient(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateReciep(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
