package readability;
import java.util.*;
import java.io.*;
import java.lang.Math;

public class Main {

    static boolean isVowel(char c) {
        if(c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            return true;
        }
        return false;
    }
    public static void main(String[] args) throws FileNotFoundException {
        File file = new File(args[0]);
        Scanner sc = new Scanner(file);
        String s = new String("");
         
        while (sc.hasNextLine())
          s = sc.nextLine();
        s = s.toLowerCase();
        int words = 0;
        words += s.split(" ").length;
        String[] list = s.split("[?!.]");
        int avg = 0;
        for(int i = 0; i < list.length; i++) {
            avg += list[i].split(" ").length;
        }
        int sentences = list.length;
        int characters = s.replace(" ", "").length();
        int syllables = 0;
        int polysyllables = 0;
        String[] wordList;
        int count = 0;
        for(int i = 0; i < sentences; i++) {
            wordList = list[i].split(" ");
            for(int j = 0; j < wordList.length; j++) {
                count = 0;
                if(wordList[j].length() < 1) {
                    continue;
                }
                if( isVowel(wordList[j].charAt(0)) ) {
                    count++;
                }
                for(int k = 1; k < wordList[j].length(); k++) {
                    if(isVowel(wordList[j].charAt(k)) && !isVowel(wordList[j].charAt(k-1))) {
                        count++;
                    }
                }
                if(wordList[j].charAt(wordList[j].length()-1) == 'e') {
                    count--;
                }
                if(count == 0) count = 1;
                syllables += count;
                if(count > 2) {
                    polysyllables++;
                }
            }     
        }
        double score1 = 4.71 * characters / words + 0.5 * words / sentences - 21.43;
        double score2 = 0.39 * words / sentences + 11.8 * syllables / words - 15.59;
        double score3 = 1.043 * Math.sqrt(polysyllables * 30 / sentences) + 3.1291;
        double L = characters / words * 100;
        double S = sentences /words * 100;
        double score4 = 0.0588 * L - 0.296 * S - 15.8;

        
        System.out.println("The text is:");
        System.out.println(s);
        System.out.println("\nWords: " + words);
        System.out.println("Sentences: " + sentences);
        System.out.println("Characters: " + characters);
        System.out.println("Syllables: " + syllables);
        System.out.println("Polysyllables: " + polysyllables);
        System.out.println("Enter the score you want to calculate (ARI, FK, SMOG, CL, all):");
        int x = (int)score1;
        Scanner scan = new Scanner(System.in);
        String str = scan.nextLine();
        System.out.print("Automated Readability Index: ");
        System.out.printf("%,.2f",score1);
        System.out.println(" (about " + (x+6) + "-year-olds).");
        x = (int)score2;
        System.out.print("Flesch–Kincaid readability tests: ");
        System.out.printf("%,.2f",score2);
        System.out.println(" (about " + (x+6) + "-year-olds).");
        x = (int)score3;
        System.out.print("Simple Measure of Gobbledygook: ");
        System.out.printf("%,.2f",score3);
        System.out.println(" (about " + (x+6) + "-year-olds).");
        x = (int)score4;
        System.out.print("Coleman–Liau index: ");
        System.out.printf("%,.2f",score4);
        System.out.println(" (about " + (x+6) + "-year-olds).");
        System.out.println("\nThis text should be understood by " + (x+5) +"-" + (x+6) + " year-olds.");
    }
}
