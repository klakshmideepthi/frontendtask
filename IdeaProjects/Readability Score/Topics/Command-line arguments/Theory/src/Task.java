import java.util.Scanner;

class Task {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    String s = scan.nextLine();
    String[] list = s.split(" ");
    for(int i = 0; i < list.length; i++) {
      System.out.println(list[i] + "=" + list[i+1]);
      i++;
    }
  }
}
