#include<bits/stdc++.h>
using namespace std;

void pattern7(int n){
  for(int i=1;i<=n;i++){
    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    for(int j=1;j<=2*i-1;j++){
      cout << "*";
    }

    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    cout << "\n";
  }
}

void pattern8(int n){
  for(int i=n;i>=1;i--){
    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    for(int j=1;j<=2*i-1;j++){
      cout << "*";
    }

    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    cout << "\n";
  }
}

void pattern9(int n){
  for(int i=1;i<=n;i++){
    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    for(int j=1;j<=2*i-1;j++){
      cout << "*";
    }

    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    cout << "\n";
  }

  for(int i=n;i>=1;i--){
    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    for(int j=1;j<=2*i-1;j++){
      cout << "*";
    }

    for(int j=1;j<=n-i;j++){
      cout << " ";
    }

    cout << "\n";
  }
}

void pattern10(int n){
  for(int i=1;i<=2*n-1;i++){
    if(i>n){
      for(int j=1;j<=2*n-i;j++){
        cout << "*";
      }
      cout << "\n";
    }else{
      for(int j=1;j<=i;j++){
        cout << "*";
      }
      cout << "\n";
    }
  }
}

void pattern11(int n){
  int num;
  for(int i=0;i<n;i++){
    if(i%2==0){
      num = 1;
      for(int j=0;j<=i;j++){
        cout << num;
        num = 1-num;
      }
    }else{
      num = 0;
      for(int j=0;j<=i;j++){
        cout << num;
        num = 1-num;
      }
    }
    cout << "\n";
  }
}

void pattern12(int n){
  for(int i=1;i<=n;i++){
    for(int j=1;j<=i;j++){
      cout << j;
    }

    for(int j=1;j<=2*(n-i);j++){
      cout << " ";
    }

    for(int j=i;j>=1;j--){
      cout << j;
    }

    cout << "\n";
  }
}

void pattern13(int n){
  int num = 1;
  for(int i=1;i<=n;i++){
    for(int j=1;j<=i;j++){
      cout << num << " ";
      num++;
    }
    cout << "\n";
  }
}
int main(){
  int n;
  cin >> n;

  pattern13(n);

}